angular.module('myApp', [])

//this value is an object
.value("COLOR_THEME_VALUES", {
  RED: {
    bodyColor: 'red',
    fontColor: 'font-red',
    displayValue: "Red Fire"
  },
  BLUE: {
    bodyColor: 'blue',
    fontColor: 'font-blue',
    displayValue: "blue bird"
  },
  YELLOW:  {
    bodyColor: 'yellow',
    fontColor: 'font-yellow',
    displayValue: "yellow dragon"
  },
  GREEN: {
    bodyColor: 'green',
    fontColor: 'font-green',
    displayValue: "green giant"
  }
})

.factory('MyFactoryExample', function() {
  var name = "hello";
  var test = function() {
    console.log("test")
  }
  return {
    myName: name
  }
})

.service('MyServiceExample', function () {
  this.serviceName = "Ford";
  this.serviceFunction = function() {
    console.log("log from service")
  };
})

.factory('MathExpressionCalculator', function() {
  return {
    sum: function(array) {
      //this should be a for loop but in rush
      return array[1] + array[0]
    }
  }
})

.controller('MyUIThemeCtrl', function(MathExpressionCalculator, COLOR_THEME_VALUES, MyFactoryExample, MyServiceExample) {
  var self = this;

  self.sum = 0;
  self.currentNumber = 0;

  self.currentArray = [];
  self.addNumber = function() {
    self.currentArray.push(self.currentNumber);
  }

  function updateTotals() {
    self.sum = MathExpressionCalculator.sum(self.currentArray)
  }

  console.log(MyFactoryExample);
  console.log(MyServiceExample);

  self.COLOR_THEME_VALUES = COLOR_THEME_VALUES;
})