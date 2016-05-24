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
    .state('condition2', {
      url: '/condition2',
      templateUrl: 'partials/condition2.html',
      controller: 'Condition2'
    })
    .state('condition3', {
      url: '/condition3',
      templateUrl: 'partials/condition3.html',
      controller: 'Condition3'
    })
    .state('condition4', {
      url: '/condition4',
      templateUrl: 'partials/condition4.html',
      controller: 'Condition4'
    });

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
}]);