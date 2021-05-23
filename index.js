const express =  require('express');
const config  = require('./config/index');
const routertxt = require('./routes/text.routes');
const connect = require('./database/index'); 
const { handlerErrors} = require('./utils/middlewares/errors');
const notFound =  require('./utils/middlewares/notFound');

connect(config.mongoURI);

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Hola mundo');
});
app.use('/api', routertxt);

app.use(notFound);
app.use(handlerErrors);

const server = app.listen(config.port,()=>{
  console.log(`Listen on port ${config.port}`);
});

module.exports = {app, server};