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

  $scope.$watch('question1', function(newVal, oldVal) {
    var wordLimit = 200;
    var s = newVal ? newVal.split(/\s+/) : 0; // it splits the text on space/tab/enter
    if (s.length > wordLimit) {
      alertify.error('reach word limitation');
      $scope.question1 = oldVal;
    }
  })

  $scope.$watch('question2', function(newVal, oldVal) {
    var wordLimit = 200;
    var s = newVal ? newVal.split(/\s+/) : 0; // it splits the text on space/tab/enter
    if (s.length > wordLimit) {
      alertify.error('reach word limitation');
      $scope.question2 = oldVal;
    }
  })

  $scope.$watch('question3', function(newVal, oldVal) {
    var wordLimit = 200;
    var s = newVal ? newVal.split(/\s+/) : 0; // it splits the text on space/tab/enter
    if (s.length > wordLimit) {
      alertify.error('reach word limitation');
      $scope.question3 = oldVal;
    }
  })

  $scope.$watch('question4', function(newVal, oldVal) {
    var wordLimit = 200;
    var s = newVal ? newVal.split(/\s+/) : 0; // it splits the text on space/tab/enter
    if (s.length > wordLimit) {
      alertify.error('reach word limitation');
      $scope.question4 = oldVal;
    }
  })

  $scope.ideaPools = [];
  $scope.submitIdea = function(idea) {
    $scope.ideaPools.push(idea);
    $scope.idea = '';
  };

  $scope.$on('timer-tick', function(event, data) {
    if (data.millis == 0) {
      var host = $location.host();
      var protocal = $location.protocol()
      var port = $location.port()
      $scope.$broadcast('timer-stop');
      $scope.timerRunning = false;
      console.log(protocal + "://" + host + ':' + port + "/condition1/final");
      $window.location.href = protocal + "://" + host + ':' + port + "/condition1/final";
    }
  });
}

Condition1.$inject = ['$rootScope', '$scope', '$location', '$window'];

function Condition2($rootScope, $scope) {}

Condition2.$inject = ['$rootScope', '$scope'];

function Condition3($rootScope, $scope) {}

Condition3.$inject = ['$rootScope', '$scope'];

function Condition4($rootScope, $scope) {}

Condition4.$inject = ['$rootScope', '$scope'];