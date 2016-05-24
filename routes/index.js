var home = require('./home');

module.exports = function(app) {
  app.get('/', home.index);
  app.get('/creative/introduction', home.creativeIntro)

  app.use('/api/v1/', require('./api'));
  app.get('*', home.index);
};