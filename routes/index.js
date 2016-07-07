var home = require('./home');

module.exports = function(app) {
  app.get('/', home.index);
  app.get('/creative/introduction', home.creativeIntro);
  app.get('/original/introduction', home.originalIntro);
  app.get('/creativity/introduction', home.creativityIntro);
  app.get('/originality/introduction', home.originalityIntro);
  app.use('/api/v1/', require('./api'));
  app.get('*', home.index);
};