const {readFileSync}=require('node:fs');
const routes=['screener','compare','portfolio','earnings'];
module.exports = () => ['common',...routes].map(name=>readFileSync(`MarketDesk/wwwroot/js/research/${name}.js`,'utf8')).join('\n');
