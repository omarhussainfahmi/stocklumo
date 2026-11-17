const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const story = import('data:text/javascript;base64,' + Buffer.from(fs.readFileSync('frontend/hero-story.js')).toString('base64'));

test('hero chapters hold the opening and remain continuous through boundaries and reverse scroll', async () => {
  const { HERO_STORY, storyAt } = await story;
  for (const compact of [false, true]) {
    const beats = compact ? HERO_STORY.compact : HERO_STORY.desktop;
    assert.deepEqual(storyAt(0, compact), { id: 'focus', gather: 0, exit: 0 });
    assert.equal(storyAt(beats[0].end * .8, compact).gather, 0);
    for (const boundary of [beats[0].end, beats[1].end]) {
      const before = storyAt(boundary - 1e-8, compact), after = storyAt(boundary + 1e-8, compact);
      assert.ok(Math.abs(before.gather - after.gather) < 1e-6);
      assert.ok(Math.abs(before.exit - after.exit) < 1e-6);
    }
    const positions = [0, .35, .55, .8, 1];
    const forward = positions.map(p => storyAt(p, compact));
    const backward = positions.toReversed().map(p => storyAt(p, compact)).toReversed();
    assert.deepEqual(forward, backward);
    assert.deepEqual(storyAt(1, compact), { id: 'research', gather: 1, exit: 1 });
  }
});

test('hero progress safely clamps rapid jumps and invalid input', async () => {
  const { storyAt } = await story;
  for (const value of [-1, NaN, Infinity, undefined]) assert.deepEqual(storyAt(value), storyAt(0));
  assert.deepEqual(storyAt(8), storyAt(1));
});

test('responsive story mapping preserves each beat and its local progress', async () => {
  const { correspondingProgress, storyAt } = await story;
  for (const value of [0,.1,.22,.4,.6,.72,.85,1]) {
    const compact=correspondingProgress(value,false,true);
    const before=storyAt(value,false), after=storyAt(compact,true);
    assert.equal(before.id,after.id);
    assert.ok(Math.abs(before.gather-after.gather)<1e-8);
    assert.ok(Math.abs(before.exit-after.exit)<1e-8);
    assert.ok(Math.abs(correspondingProgress(compact,true,false)-value)<1e-8);
  }
});

test('responsive progress anchors retain endpoints without a jump at the resize position', async () => {
  const { anchoredProgress } = await story;
  for(const anchor of [{raw:.3,visual:.55},{raw:0,visual:0},{raw:1,visual:1}]) {
    assert.equal(anchoredProgress(0,anchor),0);
    assert.equal(anchoredProgress(1,anchor),1);
    assert.ok(Math.abs(anchoredProgress(anchor.raw,anchor)-anchor.visual)<1e-8);
  }
});
