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

function Creative($rootScope, $scope, $location, $window, $http, $stateParams) {
  if ($stateParams.uid && $location.path() === '/creative/final') {
    $scope.uid = $stateParams.uid;
  } else if (!$rootScope.uid) {
    $location.path('/creative');
  }

  $scope.start = function() {
    $http({
      method: 'POST',
      url: '/api/v1/creative/row'
    }).success(function(response) {
      $rootScope.uid = response.data.uid;
      $rootScope.number = response.data.number;
      $rootScope.timestamp = Date.now();

      var json = 'https://ipv4.myexternalip.com/json';
      $http({
        method: 'GET',
        url: json
      }).success(function(result) {
        $rootScope.userIP = result.ip
      });

      if ($rootScope.timestamp % 2 === 0) {
        $location.path('/creative/1');
      } else {
        $location.path('/creative/2');
      }
    })
  };

  $scope.goSecond = function() {
    $http({
      method: 'POST',
      url: '/api/v1/creative/msip',
      data: {
        number: $rootScope.number,
        answer: $scope.creativeMSIP
      }
    }).success(function(response) {
      if ($rootScope.timestamp % 2 === 0) {
        $location.path('/creative/2');
      } else {
        $location.path('/creative/mid');
      }
    });
  };

  $scope.goThird = function() {
    $http({
      method: 'POST',
      url: '/api/v1/creative/sp',
      data: {
        number: $rootScope.number,
        answer1: $scope.question1,
        answer2: $scope.question2,
        answer3: $scope.question3,
        spSelect1: $scope.spClicker1Value,
        spSelect2: $scope.spClicker2Value
      }
    }).success(function(response) {
      if ($rootScope.timestamp % 2 === 0) {
        $location.path('/creative/mid');
      } else {
        $location.path('/creative/1');
      }
    });
  };

  $scope.goBeforeBrain = function() {
    $location.path('/creative/3');
  }

  $scope.goBrainStorming = function() {
    $location.path('/creative/4');
  };

  $scope.goFinal = function() {
    $location.path('/creative/final');
  };

  var question_sets = [
    [
      "In the supermarket(s) that you usually shop, which area(s) do you like or dislike the most? Please elaborate.",
      "Following the above question, which area(s) are the ones that you tend to spend more time in? Please elaborate.",
      "How do you like the layout, shelves and other equipment of the supermarket that you shop most frequently?  Please elaborate and provide some examples."
    ],
    [
      "In the supermarket(s) that you usually shop, what products do you usually get in your routine grocery shopping?",
      "How do you make decisions when selecting the products among different brands? Please elaborate and provide some examples.",
      "How do you shop and find the products in the supermarket(s) that you shop frequently? Please elaborate and provide some examples."
    ]
  ]

  var selectText = [
    ['Overall, you think the supermarket(s) you usually visit is:', 'Inconvenient', 'Convenient', 'Distressing', 'Relaxing'],
    ['Overall, you think the products in the supermarket(s) you usually visit are', 'Low Quality', 'High Quality', 'Lack of choices', 'Plenty of choices']
  ]
  var randomSeed = Math.floor((Math.random() * 2) + 1);
  $scope.questions = question_sets[randomSeed - 1];
  $scope.selectWords = selectText[randomSeed - 1];

  $scope.spClicker1Ary = [false, false, false, false, false, false];
  $scope.spClicker1Value = 0;
  $scope.spClicker1 = function(value) {
    $scope.spClicker1Ary = [false, false, false, false, false, false];
    $scope.spClicker1Value = value;
    $scope.spClicker1Ary[value - 1] = true;
  };

  $scope.spClicker2Ary = [false, false, false, false, false, false];
  $scope.spClicker2Value = 0;
  $scope.spClicker2 = function(value) {
    $scope.spClicker2Ary = [false, false, false, false, false, false];
    $scope.spClicker2Value = value;
    $scope.spClicker2Ary[value - 1] = true;
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

  $scope.ideaPools = [];
  $scope.idea = '';
  $scope.submitIdea = function(idea) {
    if ($scope.idea === '') return;
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
      var timestampEnd = Date.now();
      var usageTime = timestampEnd - $rootScope.timestamp;
      $http({
        method: 'POST',
        url: '/api/v1/creative/igt',
        data: {
          number: $rootScope.number,
          ideas: $scope.ideaPools,
          time: usageTime,
          ip: $rootScope.userIP
        }
      }).success(function(response) {
        var host = $location.host();
        var protocal = $location.protocol();
        var port = $location.port();
        $scope.$broadcast('timer-stop');
        $window.location.href = protocal + "://" + host + ':' + port + "/creative/final?uid=" + $rootScope.uid;
      });
    }
  });
}

Creative.$inject = ['$rootScope', '$scope', '$location', '$window', '$http', '$stateParams'];

function Original($rootScope, $scope, $location, $window, $http, $stateParams) {
  if ($stateParams.uid && $location.path() === '/original/final') {
    $scope.uid = $stateParams.uid;
  } else if (!$rootScope.uid) {
    $location.path('/original');
  }

  $scope.start = function() {
    $http({
      method: 'POST',
      url: '/api/v1/original/row'
    }).success(function(response) {
      $rootScope.uid = response.data.uid;
      $rootScope.number = response.data.number;
      $rootScope.timestamp = Date.now();

      var json = 'https://ipv4.myexternalip.com/json';
      $http({
        method: 'GET',
        url: json
      }).success(function(result) {
        $rootScope.userIP = result.ip
      });

      // if ($rootScope.timestamp % 2 === 0) {
      $location.path('/original/1');
      // } else {
      // $location.path('/original/2');
      // }
    })
  };

  $scope.goSecond = function() {
    $http({
      method: 'POST',
      url: '/api/v1/original/msip',
      data: {
        number: $rootScope.number,
        answer: $scope.originalMSIP
      }
    }).success(function(response) {
      // if ($rootScope.timestamp % 2 === 0) {
      $location.path('/original/2');
      // } else {
      // $location.path('/original/mid');
      // }
    });
  };

  $scope.goThird = function() {
    $http({
      method: 'POST',
      url: '/api/v1/original/sp',
      data: {
        number: $rootScope.number,
        answer1: $scope.question1,
        answer2: $scope.question2,
        answer3: $scope.question3,
        spSelect1: $scope.spClicker1Value,
        spSelect2: $scope.spClicker2Value
      }
    }).success(function(response) {
      // if ($rootScope.timestamp % 2 === 0) {
      $location.path('/original/mid');
      // } else {
      // $location.path('/original/1');
      // }
    });
  };

  $scope.goBeforeBrain = function() {
    $location.path('/original/3');
  }

  $scope.goBrainStorming = function() {
    $location.path('/original/4');
  };

  $scope.goFinal = function() {
    $location.path('/original/final');
  };

  var question_sets = [
    [
      "In the supermarket(s) that you usually shop, which area(s) do you like or dislike the most? Please elaborate.",
      "Following the above question, which area(s) are the ones that you tend to spend more time in? Please elaborate.",
      "How do you like the layout, shelves and other equipment of the supermarket that you shop most frequently?  Please elaborate and provide some examples."
    ],
    [
      "In the supermarket(s) that you usually shop, what products do you usually get in your routine grocery shopping?",
      "How do you make decisions when selecting the products among different brands? Please elaborate and provide some examples.",
      "How do you shop and find the products in the supermarket(s) that you shop frequently? Please elaborate and provide some examples."
    ]
  ]

  var selectText = [
    ['Overall, you think the supermarket(s) you usually visit is:', 'Inconvenient', 'Convenient', 'Distressing', 'Relaxing'],
    ['Overall, you think the products in the supermarket(s) you usually visit are', 'Low Quality', 'High Quality', 'Lack of choices', 'Plenty of choices']
  ]
  var randomSeed = Math.floor((Math.random() * 2) + 1);
  $scope.questions = question_sets[randomSeed - 1];
  $scope.selectWords = selectText[randomSeed - 1];

  $scope.spClicker1Ary = [false, false, false, false, false, false];
  $scope.spClicker1Value = 0;
  $scope.spClicker1 = function(value) {
    $scope.spClicker1Ary = [false, false, false, false, false, false];
    $scope.spClicker1Value = value;
    $scope.spClicker1Ary[value - 1] = true;
  };

  $scope.spClicker2Ary = [false, false, false, false, false, false];
  $scope.spClicker2Value = 0;
  $scope.spClicker2 = function(value) {
    $scope.spClicker2Ary = [false, false, false, false, false, false];
    $scope.spClicker2Value = value;
    $scope.spClicker2Ary[value - 1] = true;
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

  $scope.ideaPools = [];
  $scope.idea = '';
  $scope.submitIdea = function(idea) {
    if ($scope.idea === '') return;
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
      var timestampEnd = Date.now();
      var usageTime = timestampEnd - $rootScope.timestamp;
      $http({
        method: 'POST',
        url: '/api/v1/original/igt',
        data: {
          number: $rootScope.number,
          ideas: $scope.ideaPools,
          time: usageTime,
          ip: $rootScope.userIP
        }
      }).success(function(response) {
        var host = $location.host();
        var protocal = $location.protocol();
        var port = $location.port();
        $scope.$broadcast('timer-stop');
        $window.location.href = protocal + "://" + host + ':' + port + "/original/final?uid=" + $rootScope.uid;
      });
    }
  });
}

Original.$inject = ['$rootScope', '$scope', '$location', '$window', '$http', '$stateParams'];

function Creativity($rootScope, $scope, $location, $window, $http, $stateParams) {
  if ($stateParams.uid && $location.path() === '/creativity/final') {
    $scope.uid = $stateParams.uid;
  } else if (!$rootScope.uid) {
    $location.path('/creativity');
  }

  $scope.start = function() {
    $http({
      method: 'POST',
      url: '/api/v1/creativity/row'
    }).success(function(response) {
      $rootScope.uid = response.data.uid;
      $rootScope.number = response.data.number;
      $rootScope.timestamp = Date.now();

      var json = 'https://ipv4.myexternalip.com/json';
      $http({
        method: 'GET',
        url: json
      }).success(function(result) {
        $rootScope.userIP = result.ip
      });

      // if ($rootScope.timestamp % 2 === 0) {
      // $location.path('/creativity/1');
      // } else {
      $location.path('/creativity/2');
      // }
    })
  };

  $scope.goSecond = function() {
    $http({
      method: 'POST',
      url: '/api/v1/creativity/msip',
      data: {
        number: $rootScope.number,
        answer: $scope.creativityMSIP
      }
    }).success(function(response) {
      // if ($rootScope.timestamp % 2 === 0) {
      // $location.path('/creativity/2');
      // } else {
      $location.path('/creativity/mid');
      // }
    });
  };

  $scope.goThird = function() {
    $http({
      method: 'POST',
      url: '/api/v1/creativity/sp',
      data: {
        number: $rootScope.number,
        answer1: $scope.question1,
        answer2: $scope.question2,
        answer3: $scope.question3,
        spSelect1: $scope.spClicker1Value,
        spSelect2: $scope.spClicker2Value
      }
    }).success(function(response) {
      // if ($rootScope.timestamp % 2 === 0) {
      // $location.path('/creativity/mid');
      // } else {
      $location.path('/creativity/1');
      // }
    });
  };

  $scope.goBeforeBrain = function() {
    $location.path('/creativity/3');
  }

  $scope.goBrainStorming = function() {
    $location.path('/creativity/4');
  };

  $scope.goFinal = function() {
    $location.path('/creativity/final');
  };

  $scope.spClicker1Ary = [false, false, false, false, false, false];
  $scope.spClicker1Value = 0;
  $scope.spClicker1 = function(value) {
    $scope.spClicker1Ary = [false, false, false, false, false, false];
    $scope.spClicker1Value = value;
    $scope.spClicker1Ary[value - 1] = true;
  };

  $scope.spClicker2Ary = [false, false, false, false, false, false];
  $scope.spClicker2Value = 0;
  $scope.spClicker2 = function(value) {
    $scope.spClicker2Ary = [false, false, false, false, false, false];
    $scope.spClicker2Value = value;
    $scope.spClicker2Ary[value - 1] = true;
  };

  var question_sets = [
    [
      "What is your favorite sport (workout)? Please explain why you think so.",
      "How much time and attention do you usually devote to your favorite sports (workout)? Please provide some examples of your behavior.",
      "How important do you think it is for people to devote time and energy to sports (workout)? Please explain why you think so."
    ]
  ]

  $scope.questions = question_sets[0];

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

  $scope.ideaPools = [];
  $scope.idea = '';
  $scope.submitIdea = function(idea) {
    if ($scope.idea === '') return;
    $scope.ideaPools.unshift(idea);
    $scope.idea = '';
  };

  $scope.timerStart = function() {
    if ($scope.idea.length === 0 && $scope.ideaPools.length === 0) {
      $scope.$broadcast('timer-start');
    }
  };

  $scope.$on('timer-tick', function(event, data) {
    var timestampEnd = Date.now();
    var usageTime = timestampEnd - $rootScope.timestamp;
    if (data.millis == 0) {
      $http({
        method: 'POST',
        url: '/api/v1/creativity/igt',
        data: {
          number: $rootScope.number,
          ideas: $scope.ideaPools,
          time: usageTime,
          ip: $rootScope.userIP
        }
      }).success(function(response) {
        var host = $location.host();
        var protocal = $location.protocol();
        var port = $location.port();
        $scope.$broadcast('timer-stop');
        $window.location.href = protocal + "://" + host + ':' + port + "/creativity/final?uid=" + $rootScope.uid;
      });
    }
  });
}

Creativity.$inject = ['$rootScope', '$scope', '$location', '$window', '$http', '$stateParams'];

function Originality($rootScope, $scope, $location, $window, $http, $stateParams) {
  if ($stateParams.uid && $location.path() === '/originality/final') {
    $scope.uid = $stateParams.uid;
  } else if (!$rootScope.uid) {
    $location.path('/originality');
  }

  $scope.start = function() {
    $http({
      method: 'POST',
      url: '/api/v1/originality/row'
    }).success(function(response) {
      $rootScope.uid = response.data.uid;
      $rootScope.number = response.data.number;
      $rootScope.timestamp = Date.now();

      var json = 'https://ipv4.myexternalip.com/json';
      $http({
        method: 'GET',
        url: json
      }).success(function(result) {
        $rootScope.userIP = result.ip
      });

      if ($rootScope.timestamp % 2 === 0) {
        $location.path('/originality/1');
      } else {
        $location.path('/originality/2');
      }
    })
  };

  $scope.goSecond = function() {
    $http({
      method: 'POST',
      url: '/api/v1/originality/msip',
      data: {
        number: $rootScope.number,
        answer: $scope.originalityMSIP
      }
    }).success(function(response) {
      if ($rootScope.timestamp % 2 === 0) {
        $location.path('/originality/2');
      } else {
        $location.path('/originality/mid');
      }
    });
  };

  $scope.goThird = function() {
    $http({
      method: 'POST',
      url: '/api/v1/originality/sp',
      data: {
        number: $rootScope.number,
        answer1: $scope.question1,
        answer2: $scope.question2,
        answer3: $scope.question3,
        spSelect1: $scope.spClicker1Value,
        spSelect2: $scope.spClicker2Value
      }
    }).success(function(response) {
      if ($rootScope.timestamp % 2 === 0) {
        $location.path('/originality/mid');
      } else {
        $location.path('/originality/1');
      }
    });
  };

  $scope.goBeforeBrain = function() {
    $location.path('/originality/3');
  }

  $scope.goBrainStorming = function() {
    $location.path('/originality/4');
  };

  $scope.goFinal = function() {
    $location.path('/originality/final');
  };

  $scope.spClicker1Ary = [false, false, false, false, false, false];
  $scope.spClicker1Value = 0;
  $scope.spClicker1 = function(value) {
    $scope.spClicker1Ary = [false, false, false, false, false, false];
    $scope.spClicker1Value = value;
    $scope.spClicker1Ary[value - 1] = true;
  };

  $scope.spClicker2Ary = [false, false, false, false, false, false];
  $scope.spClicker2Value = 0;
  $scope.spClicker2 = function(value) {
    $scope.spClicker2Ary = [false, false, false, false, false, false];
    $scope.spClicker2Value = value;
    $scope.spClicker2Ary[value - 1] = true;
  };

  var question_sets = [
    [
      "What is your favorite sport (workout)? Please explain why you think so.",
      "How much time and attention do you usually devote to your favorite sports (workout)? Please provide some examples of your behavior.",
      "How important do you think it is for people to devote time and energy to sports (workout)? Please explain why you think so."
    ]
  ]

  $scope.questions = question_sets[0];


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

  $scope.ideaPools = [];
  $scope.idea = '';
  $scope.submitIdea = function(idea) {
    if ($scope.idea === '') return;
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
      var timestampEnd = Date.now();
      var usageTime = timestampEnd - $rootScope.timestamp;
      $http({
        method: 'POST',
        url: '/api/v1/originality/igt',
        data: {
          number: $rootScope.number,
          ideas: $scope.ideaPools,
          time: usageTime,
          ip: $rootScope.userIP
        }
      }).success(function(response) {
        var host = $location.host();
        var protocal = $location.protocol();
        var port = $location.port();
        $scope.$broadcast('timer-stop');
        $window.location.href = protocal + "://" + host + ':' + port + "/originality/final?uid=" + $rootScope.uid;
      });
    }
  });
}

Originality.$inject = ['$rootScope', '$scope', '$location', '$window', '$http', '$stateParams'];