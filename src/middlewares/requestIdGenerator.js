const { v4: uniqueIdGenerator } = require('uuid');
exports.call = (req, res, next) => {
  const requestId = uniqueIdGenerator();
  req["requestId"] = requestId;
  next();
};