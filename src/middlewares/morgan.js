const morgan = require('morgan');
const { createWriteStream } = require('fs');

morgan.token('params', req => {
  return JSON.stringify(req.params);
});

morgan.token('body', req => {
  return JSON.stringify(req.body);
});

module.exports = morgan(':url :params :body', {
  stream: createWriteStream('requests.log')
});
