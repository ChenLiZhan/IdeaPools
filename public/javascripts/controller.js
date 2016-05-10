'use strict';

/************
CONTROLLERS
************/

function AppCtrl($rootScope, $scope) {

}

AppCtrl.$inject = ['$rootScope', '$scope'];

function Index($rootScope, $scope) {

}

Index.$inject = ['$rootScope', '$scope'];

function Condition1($rootScope, $scope, $location, $window) {
  $scope.start = function() {
    $location.path('/condition1/1');
  };

  $scope.goSecond = function() {
    $location.path('/condition1/2');
  };

  $scope.goThird = function() {
    $location.path('/condition1/3');
  };

  $scope.goBrainStorming = function() {
    $location.path('/condition1/4');
  };

  $scope.goFinal = function() {
    $location.path('/condition1/final');
  };

  $scope.goForm = function() {
    $window.location.href = 'http://google.com'
  };
}

Condition1.$inject = ['$rootScope', '$scope', '$location', '$window'];

function Condition2($rootScope, $scope) {}

Condition2.$inject = ['$rootScope', '$scope'];

function Condition3($rootScope, $scope) {}

Condition3.$inject = ['$rootScope', '$scope'];

function Condition4($rootScope, $scope) {}

Condition4.$inject = ['$rootScope', '$scope'];