var home = require('./home');

module.exports = function(app) {
  app.get('/', home.index);
  app.get('/condition1', home.index1);
  app.get('/condition2', home.index2);
  app.get('/condition3', home.index3);
  app.get('/condition4', home.index4);
};