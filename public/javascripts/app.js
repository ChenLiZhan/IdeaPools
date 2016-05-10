var app = angular.module('myApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $controllerProvider, $locationProvider) {
  $controllerProvider.allowGlobals();

  $stateProvider
    .state('home', {
      url: '/',
      template: 'partials/index.html',
      controller: 'Index'
    })
    .state('condition1', {
      url: '/condition1',
      templateUrl: 'partials/condition1.html',
      controller: 'Condition1'
    })
    .state('condition1-1', {
      url: '/condition1/1',
      templateUrl: 'partials/condition1-1.html',
      controller: 'Condition1'
    })
    .state('condition1-2', {
      url: '/condition1/2',
      templateUrl: 'partials/condition1-2.html',
      controller: 'Condition1'
    })
    .state('condition1-3', {
      url: '/condition1/3',
      templateUrl: 'partials/condition1-3.html',
      controller: 'Condition1'
    })
    .state('condition1-4', {
      url: '/condition1/4',
      templateUrl: 'partials/condition1-4.html',
      controller: 'Condition1'
    })
    .state('condition1-final', {
      url: '/condition1/final',
      templateUrl: 'partials/condition1-final.html',
      controller: 'Condition1'
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