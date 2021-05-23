const mongoose = require('mongoose');

function connect(uri){
  mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
    .then(()=>{
      console.log('Database connected');
    })
    .catch(err =>{
      console.error(err.message);
    });
}

module.exports = connect;