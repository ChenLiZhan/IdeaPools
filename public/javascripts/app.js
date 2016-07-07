var app = angular.module('myApp', ['ui.router', 'timer', 'angular-loading-bar']);

app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$locationProvider', 'cfpLoadingBarProvider', function($stateProvider, $urlRouterProvider, $controllerProvider, $locationProvider, cfpLoadingBarProvider) {
  $controllerProvider.allowGlobals();
  cfpLoadingBarProvider.includeSpinner = false;

  $stateProvider
    .state('home', {
      url: '/',
      template: 'partials/index.html',
      controller: 'Index'
    })
    .state('creative', {
      url: '/creative',
      templateUrl: 'partials/creative.html',
      controller: 'Creative'
    })
    .state('creative-1', {
      url: '/creative/1',
      templateUrl: 'partials/creative-1.html',
      controller: 'Creative'
    })
    .state('creative-2', {
      url: '/creative/2',
      templateUrl: 'partials/creative-2.html',
      controller: 'Creative'
    })
    .state('creative-3', {
      url: '/creative/3',
      templateUrl: 'partials/creative-3.html',
      controller: 'Creative'
    })
    .state('creative-mid', {
      url: '/creative/mid',
      templateUrl: 'partials/creative-mid.html',
      controller: 'Creative'
    })
    .state('creative-4', {
      url: '/creative/4',
      templateUrl: 'partials/creative-4.html',
      controller: 'Creative'
    })
    .state('creative-final', {
      url: '/creative/final?uid',
      templateUrl: 'partials/creative-final.html',
      controller: 'Creative'
    })
    .state('original', {
      url: '/original',
      templateUrl: 'partials/original.html',
      controller: 'Original'
    })
    .state('original-1', {
      url: '/original/1',
      templateUrl: 'partials/original-1.html',
      controller: 'Original'
    })
    .state('original-2', {
      url: '/original/2',
      templateUrl: 'partials/original-2.html',
      controller: 'Original'
    })
    .state('original-3', {
      url: '/original/3',
      templateUrl: 'partials/original-3.html',
      controller: 'Original'
    })
    .state('original-mid', {
      url: '/original/mid',
      templateUrl: 'partials/original-mid.html',
      controller: 'Original'
    })
    .state('original-4', {
      url: '/original/4',
      templateUrl: 'partials/original-4.html',
      controller: 'Original'
    })
    .state('original-final', {
      url: '/original/final?uid',
      templateUrl: 'partials/original-final.html',
      controller: 'Original'
    })
    .state('creativity', {
      url: '/creativity',
      templateUrl: 'partials/creativity.html',
      controller: 'Creativity'
    })
    .state('creativity-1', {
      url: '/creativity/1',
      templateUrl: 'partials/creativity-1.html',
      controller: 'Creativity'
    })
    .state('creativity-2', {
      url: '/creativity/2',
      templateUrl: 'partials/creativity-2.html',
      controller: 'Creativity'
    })
    .state('creativity-3', {
      url: '/creativity/3',
      templateUrl: 'partials/creativity-3.html',
      controller: 'Creativity'
    })
    .state('creativity-mid', {
      url: '/creativity/mid',
      templateUrl: 'partials/creativity-mid.html',
      controller: 'Creativity'
    })
    .state('creativity-4', {
      url: '/creativity/4',
      templateUrl: 'partials/creativity-4.html',
      controller: 'Creativity'
    })
    .state('creativity-final', {
      url: '/creativity/final?uid',
      templateUrl: 'partials/creativity-final.html',
      controller: 'Creativity'
    })
    .state('originality', {
      url: '/originality',
      templateUrl: 'partials/originality.html',
      controller: 'Originality'
    })
    .state('originality-1', {
      url: '/originality/1',
      templateUrl: 'partials/originality-1.html',
      controller: 'Originality'
    })
    .state('originality-2', {
      url: '/originality/2',
      templateUrl: 'partials/originality-2.html',
      controller: 'Originality'
    })
    .state('originality-3', {
      url: '/originality/3',
      templateUrl: 'partials/originality-3.html',
      controller: 'Originality'
    })
    .state('originality-mid', {
      url: '/originality/mid',
      templateUrl: 'partials/originality-mid.html',
      controller: 'Originality'
    })
    .state('originality-4', {
      url: '/originality/4',
      templateUrl: 'partials/originality-4.html',
      controller: 'Originality'
    })
    .state('originality-final', {
      url: '/originality/final?uid',
      templateUrl: 'partials/originality-final.html',
      controller: 'Originality'
    })
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}]);