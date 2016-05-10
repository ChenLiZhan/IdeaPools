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

function Condition1($rootScope, $scope, $location) {
  $scope.start = function() {
    $location.path('/condition1/1');
  }
}

Condition1.$inject = ['$rootScope', '$scope', '$location'];

function Condition2($rootScope, $scope) {}

Condition2.$inject = ['$rootScope', '$scope'];

function Condition3($rootScope, $scope) {}

Condition3.$inject = ['$rootScope', '$scope'];

function Condition4($rootScope, $scope) {}

Condition4.$inject = ['$rootScope', '$scope'];