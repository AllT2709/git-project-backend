const express =  require('express');
const config  = require('./config/index');
const routertxt = require('./routes/text.routes');
const {notFoundErr} = require('./utils/errors'); 
const app = express();

app.use(express.json());
app.use('/api', routertxt);

app.use(notFoundErr);
app.listen(config.port,()=>{
  console.log(`Listen on port ${config.port}`);
});