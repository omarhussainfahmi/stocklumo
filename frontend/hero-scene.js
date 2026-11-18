import { AmbientLight, Box3, Color, DirectionalLight, Group, Mesh, MeshBasicMaterial, MeshPhysicalMaterial,
  PerspectiveCamera, Scene, Vector3, WebGLRenderer, ExtrudeGeometry, ACESFilmicToneMapping,
  PMREMGenerator, BufferGeometry, CatmullRomCurve3, Line, LineBasicMaterial, SphereGeometry } from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { HERO_STORY, storyAt, correspondingProgress, anchoredProgress } from './hero-story.js';

// Decorative brand geometry only. No market data, global render loop or remote assets.
export async function mountHero(host, { signal } = {}) {
  const hero = host.closest('.intro');
  let renderer;
  try { renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch { host.dataset.state = 'fallback'; return () => {}; }
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true'); canvas.tabIndex = -1;
  renderer.setClearColor(0, 0); renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  const scene = new Scene(), camera = new PerspectiveCamera(34, 1, .1, 500);
  camera.position.z = 160;
  const root = new Group(), ribbon = new Group(); root.add(ribbon); scene.add(root);
  const ambient = new AmbientLight(0xffffff, .8);
  const key = new DirectionalLight(0xffffff, 2); key.position.set(-45, 60, 85);
  const edge = new DirectionalLight(0x56f3d5, 3); edge.position.set(65, -15, -25);
  scene.add(ambient, key, edge);
  const pmrem = new PMREMGenerator(renderer), room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture; room.dispose(); pmrem.dispose();
  const materials = [], geometries = [], parts = [], signals = [];
  const field = new Group(); scene.add(field);
  let disposed = false, visible = true, paused = false, frame = 0, intro;
  let compactMode = getComputedStyle(host).getPropertyValue('--hero-layout').trim() === 'compact';
  let layoutWidth = 0, layoutHeight = 0, layoutTop = 0, progressAnchor;
  let trigger, intersection, resize, themeObserver;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const pose = { entry: 1, scroll: 0, x: 0, y: 0 };
  const dark = () => document.documentElement.dataset.theme === 'dark';
  let userPaused = false;
  try { userPaused = sessionStorage.getItem('stocklumo.motionPaused') === 'true'; } catch { /* Follow shared visit-only updates when storage is blocked. */ }
  if (window.StocklumoMotion) userPaused = window.StocklumoMotion.isPaused();
  function chapter() {
    const beat = storyAt(pose.scroll, compactMode);
    if (host.dataset.chapter !== beat.id) host.dataset.chapter = beat.id;
    return beat;
  }
  function render() {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const beat = chapter();
    root.rotation.set(.08 + pose.x, -.38 + pose.y + pose.entry * .2 + beat.gather * .2 + beat.exit * .08, -.08 + beat.exit * .07);
    root.position.y = beat.exit * 5;
    root.scale.setScalar(1 - beat.exit * .08);
    parts.forEach((part, index) => { part.position.z = (index ? -1 : 1) * pose.entry * 4; });
    field.rotation.z = -.08 + beat.gather * .07;
    signals.forEach(({ line, point, curve }, index) => {
      line.geometry.setDrawRange(0, Math.round(97 * (1 - pose.entry * .65)));
      line.material.opacity = (dark() ? .24 : .28) * (1 - beat.exit * .6);
      point.material.opacity = (compactMode ? .45 : .8) * (1 - beat.exit * .6);
      curve.getPoint(.13 + index * .19 + beat.gather * .3 + (1 - pose.entry) * .06, point.position);
    });
    renderer.render(scene, camera);
  }
  function requestRender() {
    if (!frame && !disposed && visible && !document.hidden) frame = requestAnimationFrame(render);
  }
  function sizing() {
    const { width, height, top } = host.getBoundingClientRect();
    if (!width || !height) return;
    const oldCompact = compactMode, oldProgress = pose.scroll;
    const changed = Math.abs(width - layoutWidth) > 1 || Math.abs(height - layoutHeight) > 1 || Math.abs(top + scrollY - layoutTop) > 1;
    layoutWidth = width; layoutHeight = height; layoutTop = top + scrollY;
    compactMode = getComputedStyle(host).getPropertyValue('--hero-layout').trim() === 'compact';
    host.dataset.variant = compactMode ? 'compact' : 'desktop';
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, HERO_STORY.rendering.pixelRatio[host.dataset.variant]));
    renderer.setSize(width, height, false); camera.aspect = width / height;
    camera.position.z = compactMode ? Math.max(HERO_STORY.rendering.compactCameraDistance, 130 / camera.aspect) : camera.aspect < .8 ? 190 : 160;
    field.scale.setScalar(compactMode ? HERO_STORY.rendering.compactFieldScale : 1);
    camera.updateProjectionMatrix();
    if (trigger && changed) {
      const visual = correspondingProgress(oldProgress, oldCompact, compactMode);
      trigger.refresh();
      // ScrollTrigger retains its previous progress until the next update.
      // Anchor against the refreshed scroll range, not that stale variant value.
      const raw = Math.max(0, Math.min(1, (trigger.scroll() - trigger.start) / Math.max(1, trigger.end - trigger.start)));
      progressAnchor = { raw, visual }; pose.scroll = visual;
    }
    requestRender();
  }
  function syncMotion(event) {
    if (typeof event?.detail?.paused === 'boolean') userPaused = event.detail.paused;
    paused = preference.matches || userPaused;
    host.dataset.motion = paused ? 'paused' : 'active';
    if (paused || document.hidden || !visible) {
      intro?.pause(); gsap.killTweensOf(pose, 'x,y');
      if (paused || document.hidden) trigger?.disable(false);
      if (frame) cancelAnimationFrame(frame); frame = 0;
      if (paused) { pose.entry = pose.x = pose.y = pose.scroll = 0; requestRender(); }
    } else {
      trigger?.enable(false); intro?.resume(); requestRender();
    }
  }
  function move(event) {
    if (paused || !visible || !pointer.matches || document.hidden) return;
    const bounds = hero.getBoundingClientRect();
    xTo(gsap.utils.clamp(-.06, .06, ((event.clientY - bounds.top) / bounds.height - .5) * .12));
    yTo(gsap.utils.clamp(-.10, .10, ((event.clientX - bounds.left) / bounds.width - .5) * .20));
  }
  function leave() { if (!paused) { xTo(0); yTo(0); } }
  let xTo, yTo;
  function lost(event) { event.preventDefault(); cleanup(); }
  function cleanup() {
    if (disposed) return;
    disposed = true;
    if (frame) cancelAnimationFrame(frame);
    intro?.kill(); trigger?.kill(); gsap.killTweensOf(pose);
    intersection?.disconnect(); resize?.disconnect(); themeObserver?.disconnect();
    hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave);
    preference.removeEventListener('change', syncMotion);
    signal?.removeEventListener('abort', cleanup);
    document.removeEventListener('visibilitychange', syncMotion);
    document.removeEventListener('stocklumo:motionchange', syncMotion);
    canvas.removeEventListener('webglcontextlost', lost);
    geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
    environment.dispose(); renderer.dispose(); canvas.remove();
    host.dataset.state = 'fallback';
  }
  signal?.addEventListener('abort', cleanup, { once: true });
  try {
    const loader = new SVGLoader();
    const [lightLogo, darkLogo] = await Promise.all([
      loader.loadAsync('/images/stocklumo-mark.svg'), loader.loadAsync('/images/stocklumo-mark-dark.svg')
    ]);
    if (disposed || signal?.aborted || !host.isConnected) { cleanup(); return cleanup; }
    // Three fine light paths frame the mark. Never use decorative candles,
    // financial values or an always-running particle simulation here.
    const pointGeometry = new SphereGeometry(.48, 8, 6); geometries.push(pointGeometry);
    HERO_STORY.paths.forEach(points => {
      const curve = new CatmullRomCurve3(points.map(point => new Vector3(...point)));
      const geometry = new BufferGeometry().setFromPoints(curve.getPoints(96)); geometries.push(geometry);
      const material = new LineBasicMaterial({ color: lightLogo.paths[0].color, transparent: true, opacity: .24,
        toneMapped: false, depthWrite: false });
      const pointMaterial = new MeshBasicMaterial({ color: lightLogo.paths[0].color, transparent: true,
        opacity: .8, toneMapped: false, depthWrite: false });
      for (const item of [material, pointMaterial]) item.userData.themeColors = {
        light: lightLogo.paths[0].color.clone(), dark: darkLogo.paths[0].color.clone() };
      materials.push(material, pointMaterial);
      const line = new Line(geometry, material), point = new Mesh(pointGeometry, pointMaterial);
      field.add(line, point); signals.push({ line, point, curve });
    });
    lightLogo.paths.forEach((path, index) => {
      // The broad logo faces must retain the SVG's actual sRGB colors. Physical
      // lighting/tone mapping belongs on the bevel and extrusion, not the brand fill.
      const material = new MeshBasicMaterial({ color: path.color, toneMapped: false });
      material.userData.themeColors = { light: path.color.clone(), dark: darkLogo.paths[index].color.clone() };
      const side = new MeshPhysicalMaterial({ color: path.color, roughness: .3,
        metalness: .35, clearcoat: .4, clearcoatRoughness: .18, envMapIntensity: .35 });
      side.userData.themeColors = material.userData.themeColors;
      materials.push(material, side);
      const part = new Group(); parts.push(part); ribbon.add(part);
      for (const shape of SVGLoader.createShapes(path)) {
        const geometry = new ExtrudeGeometry(shape, { depth: 5, steps: 1, bevelEnabled: true,
          bevelSize: .55, bevelThickness: .65, bevelSegments: 3, curveSegments: 16 });
        geometries.push(geometry); part.add(new Mesh(geometry, [material, side]));
      }
    });
    const center = new Box3().setFromObject(ribbon).getCenter(new Vector3());
    ribbon.position.copy(center).multiplyScalar(-1);
    // Flip SVG's downward Y axis in the child; the camera/root motion remains conventional.
    const svgGroup = new Group(); root.remove(ribbon); svgGroup.add(ribbon); svgGroup.scale.y = -1; root.add(svgGroup);
    root.scale.setScalar(1);
    function theme() {
      materials.forEach(material => material.color.copy(material.userData.themeColors[dark() ? 'dark' : 'light']));
      edge.color = new Color(dark() ? 0x56f3d5 : 0xa0c9e0);
      renderer.toneMappingExposure = dark() ? 1.15 : 1.35; requestRender();
    }
    gsap.registerPlugin(ScrollTrigger);
    xTo = gsap.quickTo(pose, 'x', { duration: HERO_STORY.entry.settleDuration, ease: HERO_STORY.entry.ease, onUpdate: requestRender });
    yTo = gsap.quickTo(pose, 'y', { duration: HERO_STORY.entry.settleDuration, ease: HERO_STORY.entry.ease, onUpdate: requestRender });
    trigger = ScrollTrigger.create({ trigger: host,
      // Stable stage dimensions, not the retracting mobile browser toolbar.
      start: () => compactMode ? host.getBoundingClientRect().top + scrollY - host.clientHeight * HERO_STORY.rendering.compactTravel.lead : 'top top',
      end: () => compactMode ? host.getBoundingClientRect().top + scrollY + host.clientHeight * HERO_STORY.rendering.compactTravel.tail : 'bottom top',
      onUpdate: self => { if (!paused) { pose.scroll = anchoredProgress(self.progress, progressAnchor); chapter(); requestRender(); } } });
    intro = gsap.timeline({ paused: true, onUpdate: requestRender });
    intro.to(pose, { entry: 0, duration: HERO_STORY.entry.duration, ease: HERO_STORY.entry.ease });
    host.append(canvas);
    themeObserver = new MutationObserver(theme); themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    resize = new ResizeObserver(sizing); resize.observe(host); resize.observe(hero);
    const ticker = document.querySelector('.ticker'); if (ticker) resize.observe(ticker);
    const header = document.querySelector('.header'); if (header) resize.observe(header);
    intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncMotion(); }); intersection.observe(host);
    hero.addEventListener('pointermove', move, { passive: true }); hero.addEventListener('pointerleave', leave);
    document.addEventListener('stocklumo:motionchange', syncMotion);
    document.addEventListener('visibilitychange', syncMotion);
    preference.addEventListener('change', syncMotion);
    canvas.addEventListener('webglcontextlost', lost);
    sizing(); theme(); render(); host.dataset.state = 'ready'; syncMotion();
    return cleanup;
  } catch { cleanup(); return cleanup; }
}
