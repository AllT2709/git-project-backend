const express =  require('express');
const cors = require('cors');
const config  = require('./config/index');
const routertxt = require('./routes/text.routes');
const routerUser = require('./routes/user.routes');
const connect = require('./database/index'); 
const {handlerErrors} = require('./utils/middlewares/errors');
const notFound =  require('./utils/middlewares/notFound');

connect(config.mongoURI);

const app = express();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
  res.send('Hola mundo');
});
app.use('/api', routerUser);
app.use('/api', routertxt);

app.use(notFound);
app.use(handlerErrors);

const server = app.listen(config.port,()=>{
  console.log(`Listen on port ${config.port}`);
});

module.exports = {app, server};