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

function Condition1($rootScope, $scope, $location, $window, $http, $stateParams) {
  if ($stateParams.uid && $location.path() === '/condition1/final') {
    $scope.uid = $stateParams.uid;
  } else if (!$rootScope.uid) {
    $location.path('/condition1');
  }

  $scope.start = function() {
    $http({
      method: 'POST',
      url: '/api/v1/condition1/row'
    }).success(function(response) {
      $rootScope.uid = response.data.uid;
      $rootScope.number = response.data.number;
      $location.path('/condition1/1');
    })
  };

  $scope.goSecond = function() {
    $http({
      method: 'POST',
      url: '/api/v1/condition1/msip',
      data: {
        number: $rootScope.number,
        answer: $scope.condition1MSIP
      }
    }).success(function(response) {
      $location.path('/condition1/2');
    });
  };

  $scope.goThird = function() {
    $http({
      method: 'POST',
      url: '/api/v1/condition1/sp',
      data: {
        number: $rootScope.number,
        answer1: $scope.question1,
        answer2: $scope.question2,
        answer3: $scope.question3,
        answer4: $scope.question4
      }
    }).success(function(response) {
      $location.path('/condition1/3');
    });
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
      alertify.error('Oops! You have exceeded the word limit.');
      $scope.question1 = oldVal;
    }
  });

  $scope.$watch('question2', function(newVal, oldVal) {
    var wordLimit = 200;
    var s = newVal ? newVal.split(/\s+/) : 0; // it splits the text on space/tab/enter
    if (s.length > wordLimit) {
      alertify.error('Oops! You have exceeded the word limit.');
      $scope.question2 = oldVal;
    }
  });

  $scope.$watch('question3', function(newVal, oldVal) {
    var wordLimit = 200;
    var s = newVal ? newVal.split(/\s+/) : 0; // it splits the text on space/tab/enter
    if (s.length > wordLimit) {
      alertify.error('Oops! You have exceeded the word limit.');
      $scope.question3 = oldVal;
    }
  });

  $scope.$watch('question4', function(newVal, oldVal) {
    var wordLimit = 200;
    var s = newVal ? newVal.split(/\s+/) : 0; // it splits the text on space/tab/enter
    if (s.length > wordLimit) {
      alertify.error('Oops! You have exceeded the word limit.');
      $scope.question4 = oldVal;
    }
  });

  $scope.ideaPools = [];
  $scope.idea = '';
  $scope.submitIdea = function(idea) {
    $scope.ideaPools.unshift(idea);
    $scope.idea = '';
  };

  $scope.timerStart = function() {
    if ($scope.idea.length === 0 && $scope.ideaPools.length === 0) {
      $scope.$broadcast('timer-start');
    }
  };

  $scope.$on('timer-tick', function(event, data) {
    if (data.millis == 0) {
      $http({
        method: 'POST',
        url: '/api/v1/condition1/igt',
        data: {
          number: $rootScope.number,
          ideas: $scope.ideaPools
        }
      }).success(function(response) {
        var host = $location.host();
        var protocal = $location.protocol();
        var port = $location.port();
        $scope.$broadcast('timer-stop');
        $window.location.href = protocal + "://" + host + ':' + port + "/condition1/final?uid=" + $rootScope.uid;
      });
    }
  });
}

Condition1.$inject = ['$rootScope', '$scope', '$location', '$window', '$http', '$stateParams'];

function Condition2($rootScope, $scope) {}

Condition2.$inject = ['$rootScope', '$scope'];

function Condition3($rootScope, $scope) {}

Condition3.$inject = ['$rootScope', '$scope'];

function Condition4($rootScope, $scope) {}

Condition4.$inject = ['$rootScope', '$scope'];