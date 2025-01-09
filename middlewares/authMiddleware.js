const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.header('Authorization');  
  
  // Check if the token exists and starts with "Bearer"
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).send('Access Denied: No Token Provided');
  }

  try {
    const actualToken = token.split(' ')[1]; 
    
    req.user = jwt.verify(actualToken, process.env.JWT_SECRET);
    
    next();  
  } catch (error) {
    res.status(400).send('Invalid Token');  // Invalid or expired token
  }
}

module.exports = authMiddleware;
