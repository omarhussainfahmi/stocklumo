// Authored geometry, not market data or generated footage. One source for the
// short opening's pacing; all copy remains ordinary, always-available HTML.
export const HERO_STORY = {
  rendering: { pixelRatio: { desktop: 1.5, compact: 1 }, compactCameraDistance: 182, compactFieldScale: .84,
    compactTravel: { lead: 2.4, tail: .2 } },
  // Normalized target composition for every beat in the compact visual stage.
  subject: { focalPoint: [.5, .5], safeBounds: [.08, .08, .92, .92] },
  entry: { duration: 1.2, settleDuration: .5, ease: 'power3.out' },
  desktop: [
    { id: 'focus', start: 0, end: .22, gather: [0, 0], exit: [0, 0] },
    { id: 'gather', start: .22, end: .72, gather: [0, 1], exit: [0, 0] },
    { id: 'research', start: .72, end: 1, gather: [1, 1], exit: [0, 1] }
  ],
  compact: [
    { id: 'focus', start: 0, end: .3, gather: [0, 0], exit: [0, 0] },
    { id: 'gather', start: .3, end: .75, gather: [0, 1], exit: [0, 0] },
    { id: 'research', start: .75, end: 1, gather: [1, 1], exit: [0, 1] }
  ],
  paths: [
    [[-38,-49,-24],[-43,-23,-26],[-40,12,-28],[-16,43,-28],[22,50,-28],[42,35,-26]],
    [[-42,-37,-30],[-31,-48,-30],[12,-46,-30],[41,-16,-30],[43,20,-30],[28,47,-30]],
    [[-40,30,-36],[-20,48,-36],[17,42,-36],[38,12,-36],[31,-25,-36],[3,-50,-36]]
  ]
};

export function storyAt(progress, compact = false) {
  const value = Number.isFinite(progress) ? Math.max(0, Math.min(1, progress)) : 0;
  const beats = compact ? HERO_STORY.compact : HERO_STORY.desktop;
  const beat = beats.find(item => value < item.end) || beats[beats.length - 1];
  const phase = (value - beat.start) / (beat.end - beat.start);
  return { id: beat.id,
    gather: beat.gather[0] + (beat.gather[1] - beat.gather[0]) * phase,
    exit: beat.exit[0] + (beat.exit[1] - beat.exit[0]) * phase };
}

export function correspondingProgress(progress, wasCompact, isCompact) {
  const previous = wasCompact ? HERO_STORY.compact : HERO_STORY.desktop;
  const next = isCompact ? HERO_STORY.compact : HERO_STORY.desktop;
  const value = Math.max(0, Math.min(1, progress));
  const index = previous.findIndex(beat => value < beat.end);
  const before = previous[index < 0 ? previous.length - 1 : index], after = next[index < 0 ? next.length - 1 : index];
  return after.start + (value - before.start) / (before.end - before.start) * (after.end - after.start);
}

// Preserve the current visual pose across a real layout change while keeping
// both endpoints reachable and reverse scrolling continuous.
export function anchoredProgress(raw, anchor) {
  if (!anchor) return raw;
  if (raw <= anchor.raw) return anchor.raw ? anchor.visual * raw / anchor.raw : 0;
  return anchor.raw < 1 ? anchor.visual + (1 - anchor.visual) * (raw - anchor.raw) / (1 - anchor.raw) : 1;
}
