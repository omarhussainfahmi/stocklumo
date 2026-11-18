// Synthetic data for isolated preview tests only. Never application/provider data.
const fs = require('node:fs'), path = require('node:path');
module.exports = function createPreviewData() {
  const capturedAt = new Date(), end = new Date(capturedAt);end.setUTCHours(0,0,0,0);end.setUTCDate(end.getUTCDate()-1);
  const dates=[];for(const date=new Date(end);dates.length<270;date.setUTCDate(date.getUTCDate()-1))if(![0,6].includes(date.getUTCDay()))dates.unshift(new Date(date));
  const symbols=['AAPL','MSFT','AMZN','GOOGL','META','TSLA','V','NVDA'];
  const histories={},adjusted={},intraday={},financials={};
  for(const [index,symbol] of symbols.entries()){
    histories[symbol]=dates.map((d,i)=>({time:+d/1000,open:100+i+index,high:103+i+index,low:99+i+index,close:101+i+index,volume:1000000+i*1000}));
    adjusted[symbol]=histories[symbol].map(p=>({...p,open:p.open/2,high:p.high/2,low:p.low/2,close:p.close/2}));
    intraday[symbol]=Array.from({length:60},(_,i)=>({time:dates.at(-1).getTime()/1000+14*3600+i*60,price:120+i/10,volume:1000+i}));
  }
  for(const symbol of ['AAPL','MSFT','NVDA'])financials[symbol]=Array.from({length:5},(_,i)=>{
    const date=new Date(capturedAt);date.setUTCDate(date.getUTCDate()-30-(4-i)*90);const report=new Date(date);report.setUTCDate(report.getUTCDate()+20);
    return {period:`Test Q${i+1}`,periodEnd:date.toISOString().slice(0,10),publishedAt:report.toISOString().slice(0,10),currency:'USD',revenue:1e9+i*1e8,netIncome:2e8+i*1e7,operatingIncome:3e8+i*1e7};
  });
  const today=capturedAt.toISOString().slice(0,10),to=new Date(capturedAt);to.setUTCDate(to.getUTCDate()+30);
  const screener=Array.from({length:100},(_,i)=>({symbol:symbols[i]||`TEST${i}`,name:`Synthetic company ${i}`,currency:'USD',industry:null,price:100+i,changePercent:i%2?1:-1,marketCapMillions:1000+i,averageVolumeMillions:2,peTtm:15,dividendYieldTtm:1,timestamp:null,state:'partial',message:'Synthetic snapshot'}));
  const data={version:1,source:'Longbridge',capturedAt:capturedAt.toISOString(),histories,adjusted,intraday,financials,screener,screenerTotal:1234,calendarFrom:today,calendarTo:to.toISOString().slice(0,10),calendarSymbols:symbols,
    earnings:[{symbol:'AAPL',date:today,eventTime:today+'T14:30:00Z',currency:'USD',hour:'',epsEstimate:1.2,epsActual:null,revenueEstimate:1e9,revenueActual:null}]};
  const file=path.resolve('output/financial-preview-tests/snapshot.json');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,JSON.stringify(data));return file;
};
