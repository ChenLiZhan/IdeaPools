var home = require('./home');

module.exports = function(app) {
  app.get('/', home.index);
  app.get('/condition1/introduction', home.condition1Intro)
  app.get('*', home.index);
};