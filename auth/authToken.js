const jwt = require('jsonwebtoken');
const config = require('../config/index');

const getTokenFrom = req => {
  let authorization = req.get('authorization');
  if(authorization && authorization.startsWith('Bearer')){
    return authorization.substring(7);
  }
  return null;
};

// const verifyToken = (req,res,next) => {
//   let token = getTokenFrom(req);
//   const decodedToken = jwt.verify(token, config.secret);
//   if(!token || !decodedToken.id){
//     return res.status(401).json({error:'token missing or invalid'});
//   }
//   // return decodedToken;
//   req.userId = decodedToken.id;
//   next();
// };

// module.exports = verifyToken;

module.exports = (req,res,next) => {
  let token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, config.secret);
  if(!token || !decodedToken.id){
    return res.status(401).json({error:'token missing or invalid'});
  }
  // return decodedToken;
  req.userId = decodedToken.id;
  next();
};