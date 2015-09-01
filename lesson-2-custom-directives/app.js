angular.module('myApp', [])

.directive('myUserEditDirective', function() {
  return {
    templateUrl: '/my-user-edit-directive.html',
    restrict: 'A',
    scope: {
      currentUser: '=',
      myScopeFunction: '&',
      myScopeReadOnlyVariable: '@'
    },
    controller: 'MyDirectiveController',
    link: function(scope, element, attributes) {
      console.log(attributes)
    },
    transclude: true
  }
})

.controller('MyDirectiveController', function($scope) {
  $scope.myScopeFunction()

  $scope.isDisplaying = true;
  $scope.onEditAction
})

.controller('MyCtrl', function() {
  var self = this;

  self.testFunction = function() {
    //alert("hi")
  }

  self.userOne = {
    name: "Christina"
  }

  self.userTwo = {
    name: "Laura"
  }

  self.userThree = {
    name: "Nicholas"
  }
})