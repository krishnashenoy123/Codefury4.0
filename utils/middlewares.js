const config = require('./config');
/* eslint-disable consistent-return */
const Cors = (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', '*');
  if (request.method === 'OPTIONS') {
    response.header('Access-Control-Allow-Methods', 'GET', 'POST');
    return response.status(200).json({});
  }

  next();
};

const errorHandler = (error, request, response, next) => {
  if(error.name === 'CastError')
  {
      return response.status(400).send({
          eerror: 'malformatted id'
      })
  }
  else if(error.name === 'ValidationError')
  {
      return response.status(400).json({
          error: error.message
      })
  }
  else if(error.name === 'JsonWebTokenError')
  {
      return response.status(401).json({
          error: 'invalid token from error handler'
      })
  }
  console.log(error.message)
  next(error)
}

const objects = {
  
  Cors: Cors,
  errorHandler: errorHandler
};
module.exports = objects;