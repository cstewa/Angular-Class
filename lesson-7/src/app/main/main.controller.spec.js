'use strict';

// describe('controllers', function(){
//   var scope;

//   //called before each it block
//   beforeEach(module('lesson7'));

// //ask angular for access to the rootScope. using that rootscope to create a childScope.
//   beforeEach(inject(function($rootScope) {
//     //here we are creating a new clean scope with nothing on it
//     scope = $rootScope.$new();
//   }));

// //when we use inject, we are passing in the controller. it will get the controller wherever it is
//   it('should define more than 5 awesome things', inject(function($controller) {
//     expect(scope.awesomeThings).toBeUndefined();

//     $controller('MainCtrl', {
//       //setting the controller scope to be what we just made above so we can have access to it
//       $scope: scope
//     });

//     expect(angular.isArray(scope.awesomeThings)).toBeTruthy();
//     expect(scope.awesomeThings.length > 5).toBeTruthy();
//   }));
// });

describe('controllers', function(){
  var scope;

  //called before each it block
  beforeEach(module('lesson7'));

//when we use inject, we are passing in the controller. it will get the controller wherever it is
  it('should define more than 5 awesome things', inject(function($controller) {
    //expect(myCtrl.awesomeThings).toBeUndefined();

    var myCtrl = $controller('MainCtrl')

    expect(angular.isArray(myCtrl.awesomeThings)).toBeTruthy();
    expect(myCtrl.awesomeThings.length > 5).toBeTruthy();
  }));
});

describe("factory", function() {
  var myMathExpressionFactory;

  beforeEach(module('lesson7'));
  beforeEach(inject(function(_MathExpCalc_) {
    myMathExpressionFactory = _MathExpCalc_;
  }))

  it('should calc correct average', function() {
    expect(myMathExpressionFactory.calculateAverage([10, 20])).toBe(15);
  })
})
