const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const createToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '5min' });
};

exports.verifyToken = (req, res, next) => {
   const authHeader = req.headers['authorization'];
   if (!authHeader) return res.status(401).json({ message: 'No token provided' });
   const token = authHeader.split(' ')[1];
    // console.log(req.);
    // console.log(req.h);
   //  const token = req.header('Authorization').split(' ')[1];
   

    if (!token) return res.status(401).json({ message: 'No token provided' });
     try{
        let verifyToken= jwt.verify(token,JWT_SECRET)
        req.userId = verifyToken.id;
        next()
     }
     catch(error){
        res.status(401).json({ message: 'Failed to authenticate token.' });
     }

    //  , (err, decoded) => {
        // if (err) {
        //   return res.status(401).json({ message: 'Failed to authenticate token.' });
        // }
      
        // If the verification is successful, set the userId in the request
        // req.userId = decoded.id;
        // next(); // Call the next function to continue processing the request
    //   });
      
  };

