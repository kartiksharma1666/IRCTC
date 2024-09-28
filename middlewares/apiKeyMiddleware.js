
function apiKeyMiddleware(req, res, next) {
    const apiKey = req.header('x-api-key');
    if (apiKey === process.env.ADMIN_API_KEY) {
      next(); // Move to the next middleware or route handler
    } else {
      return res.status(403).send('Forbidden: Invalid API Key');
    }
  }
  
  module.exports = apiKeyMiddleware;
  