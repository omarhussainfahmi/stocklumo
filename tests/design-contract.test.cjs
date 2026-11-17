const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
test('portable design values mirror the canonical runtime theme tokens',()=>{
  const design=readFileSync('DESIGN.md','utf8'),css=readFileSync('MarketDesk/wwwroot/css/market.css','utf8');
  const light=css.slice(css.indexOf(':root {'),css.indexOf(':root[data-theme="dark"]'));
  const dark=css.slice(css.indexOf(':root[data-theme="dark"]'),css.indexOf('* { box-sizing'));
  const mapping={paper:'paper',panel:'panel',ink:'ink',muted:'muted',primary:'green',negative:'red',border:'line'};
  for(const [name,variable]of Object.entries(mapping)) {
    const doc=design.match(new RegExp(`^  ${name}: "(#[a-f0-9]+)"`,'m'))?.[1];
    assert.equal(doc,light.match(new RegExp(`--${variable}: (#[a-f0-9]+);`))?.[1],name);
  }
  for(const [name,variable]of Object.entries({paper:'paper',panel:'panel',ink:'ink',positive:'green',negative:'red'})) {
    assert.equal(design.match(new RegExp(`^  dark-${name}: "(#[a-f0-9]+)"`,'m'))?.[1],dark.match(new RegExp(`--${variable}: (#[a-f0-9]+);`))?.[1],`dark ${name}`);
  }
  assert.match(design,/Model B/);assert.match(design,/market\.css.*canonical/);
  assert.equal((css.match(/--panel-radius:/g)||[]).length,1);
});
