'use strict';

angular.module('lesson10')
  .value('AWESOME_THINGS',  [
      {
        'title': 'AngularJS',
        'url': 'https://angularjs.org/',
        'description': 'HTML enhanced for web apps!',
        'logo': 'angular.png'
      },
      {
        'title': 'BrowserSync',
        'url': 'http://browsersync.io/',
        'description': 'Time-saving synchronised browser testing.',
        'logo': 'browsersync.png'
      },
      {
        'title': 'GulpJS',
        'url': 'http://gulpjs.com/',
        'description': 'The streaming build system.',
        'logo': 'gulp.png'
      },
      {
        'title': 'Jasmine',
        'url': 'http://jasmine.github.io/',
        'description': 'Behavior-Driven JavaScript.',
        'logo': 'jasmine.png'
      },
      {
        'title': 'Karma',
        'url': 'http://karma-runner.github.io/',
        'description': 'Spectacular Test Runner for JavaScript.',
        'logo': 'karma.png'
      },
      {
        'title': 'Protractor',
        'url': 'https://github.com/angular/protractor',
        'description': 'End to end test framework for AngularJS applications built on top of WebDriverJS.',
        'logo': 'protractor.png'
      },
      {
        'title': 'jQuery',
        'url': 'http://jquery.com/',
        'description': 'jQuery is a fast, small, and feature-rich JavaScript library.',
        'logo': 'jquery.jpg'
      },
      {
        'title': 'Bootstrap',
        'url': 'http://getbootstrap.com/',
        'description': 'Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.',
        'logo': 'bootstrap.png'
      },
      {
        'title': 'Angular UI Bootstrap',
        'url': 'http://angular-ui.github.io/bootstrap/',
        'description': 'Bootstrap components written in pure AngularJS by the AngularUI Team.',
        'logo': 'ui-bootstrap.png'
      },
      {
        'title': 'Sass (Node)',
        'url': 'https://github.com/sass/node-sass',
        'description': 'Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.',
        'logo': 'node-sass.png'
      }
    ])

  .factory('GoogleResourceFactory', function($resource) {
    return $resource('http://maps.googleapis.com/maps/api/geocode/json')
  })

  .controller('ModalContentCtrl', function(GoogleResourceFactory, $modalInstance, thingsToPass) {
    var self = this;
    self.items = thingsToPass.items;

    self.getResults = function(query) {
      GoogleResourceFactory.get({address: query}, function(response) {
        self.data = response.results;
        console.log(response)
      })
    }

    self.submit = function() {
      $modalInstance.close(self.email)
    };

    //from the perspective of the markup, NOT the controller
    self.gridOptions = {
      data: "ctrl.data",
      columnDefs: [{
        displayName: "Address",
        field: "formatted_address",
        cellTemplate: "app/main/myCellTemplate.html"
      }, {
        displayName: "Latitude",
        field: "geometry.location.lat"
      },{
        displayName: "Longitude",
        field: "geometry.location.lng"
      }]
    }
  })

  .directive('myColorDirective', function() {
    return {
      restrict: "A",
      scope: {
        row: "=",
        col: "="
      },
      controller: "MyDirectiveCtrl",
      controllerAs: "myCtrl",
      bindToController: true,
      templateUrl: 'app/main/myColorDirective.html'
    }
  })

  .controller('MyDirectiveCtrl', function() {

  })
  .controller('MainCtrl', function ($scope, $timeout, $modal, AWESOME_THINGS) {
    $scope.awesomeThings = AWESOME_THINGS;
    $timeout(function() {
      var modalPromise = $modal.open({
        templateUrl: 'app/main/modalContent.html',
        controller: 'ModalContentCtrl as ctrl',
        backdrop: 'static',
        resolve: {
          thingsToPass: function() {
            return {
              items: ["itemOne", "itemTwo" ]
            }
          }
        }
      })
      modalPromise.result.then(function onSuccess(result) {
        console.log("email" + result)
      }, function onError(error) {
        console.log(error)
      })

    }, 2000)
  });
