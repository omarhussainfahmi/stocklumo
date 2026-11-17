const {defineConfig}=require('@playwright/test');
const base=require('./playwright.config.cjs');
const file=require('./tests/e2e/support/preview-data.cjs')();
module.exports=defineConfig({...base,projects:base.projects.filter(project=>project.name!=='desktop-webkit-layout'),testMatch:'**/*.check.cjs',workers:1,
  outputDir:'output/financial-preview-tests/artifacts',
  use:{...base.use,baseURL:'http://127.0.0.1:5162'},
  reporter:[['list'],['json',{outputFile:'output/financial-preview-tests/results.json'}]],
  webServer:{...base.webServer,url:'http://127.0.0.1:5162/health',
    command:`"${process.env.STOCKLUMO_DOTNET||'dotnet'}" run --project MarketDesk --no-launch-profile --urls http://127.0.0.1:5162`,
    env:{...base.webServer.env,ResearchPreview__Enabled:'true',ResearchPreview__File:file}}
});
