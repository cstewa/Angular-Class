'use strict';

function setDebugFlag(newValue) {
  //you can do this in the console too -- get the injector
  var injector = angular.element(document.body).injector()
  var globalSettings = injector.get('GlobalSetting')
  globalSettings.isDebug = newValue
}

angular.module('advancedTesting', ['ngResource', 'ui.router', 'ui.bootstrap', 'GoogleApiModule'])
  .config(function ($stateProvider, $urlRouterProvider, $provide) {

    //does not override all of log, just adds or changes functionality. ie this changes the debug function
    $provide.decorator('$log', function($delegate, GlobalSetting) {

      //grabbing the original debug function and setting it in a variable so you can use it later
      var tempDebugFunction = $delegate.debug;

      $delegate.debug = function() {
        if (GlobalSetting.isDebug) {
          tempDebugFunction.apply(null, arguments)
        }
      }

      return $delegate
    })

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: "ctrl"
      });

    $urlRouterProvider.otherwise('/');
  })
;
