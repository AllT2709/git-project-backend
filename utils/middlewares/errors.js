
const handlerErrors = (err,req,res,next) =>{
  console.error(err.name);
  if(err.name === 'CastError'){
    res.status(400).json({
      error: 'Malformatted id'
    });
  }else if(err.name === 'ValidationError'){
    res.status(400).json({
      error: err.message
    });
  }else if(err.name === 'JsonWebTokenError'){
    res.status(401).json({
      error: 'invalid token'
    });
  }else if (err.name === 'TypeError'){
    res.status(500).json('internal error');
  }
  next(err);
};

module.exports = {
  handlerErrors,
};