const notFoundErr = (req,res) =>{
  res.status(404).json({
    error: 'Not Dound'
  });
};

module.exports = {
  notFoundErr,
};