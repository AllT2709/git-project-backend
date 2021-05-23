const handlerErrors = (err,req,res,next) =>{
  if(err.name === 'CastError'){
    res.status(400).json({
      error: 'Malformatted id'
    });
  }else if(err.name === 'ValidationError'){
    res.status(400).json({
      error: err.message
    });
  }
  next(err);
};

module.exports = {
  handlerErrors,
};