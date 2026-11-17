const esbuild = require('esbuild');
const fs = require('node:fs/promises');
const path = require('node:path');
const output = 'MarketDesk/wwwroot/js/generated/hero-scene.js';
(async () => {
  const result = await esbuild.build({ entryPoints: ['frontend/hero-scene.js'], outfile: output,
    bundle: true, format: 'esm', platform: 'browser', target: ['es2022'], minify: true,
    legalComments: 'external', write: false, logLevel: 'warning' });
  for (const file of result.outputFiles) {
    if (process.argv.includes('--check')) {
      if (!Buffer.from(file.contents).equals(await fs.readFile(file.path))) throw Error(`Rebuild stale hero asset: ${file.path}`);
    } else { await fs.mkdir(path.dirname(file.path), { recursive: true }); await fs.writeFile(file.path, file.contents); }
  }
  // GSAP's npm package publishes its licensing notice in README, not a LICENSE file.
  const licenses = [['three', 'LICENSE'], ['gsap', 'README.md']].map(([name, file]) => `${name.toUpperCase()}\n` + require('node:fs').readFileSync(`node_modules/${name}/${file}`, 'utf8')).join('\n\n');
  const licensePath = path.join(path.dirname(output), 'LICENSES.txt');
  if (process.argv.includes('--check')) {
    if (await fs.readFile(licensePath, 'utf8') !== licenses) throw Error('Hero license bundle is stale.');
  } else await fs.writeFile(licensePath, licenses);
  console.log(`Hero bundle ${process.argv.includes('--check') ? 'verified' : 'built'} (${result.outputFiles.find(file => file.path.endsWith('.js')).contents.length} bytes).`);
})().catch(error => { console.error(error.message); process.exitCode = 1; });
