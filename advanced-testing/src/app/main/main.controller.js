'use strict';

angular.module('advancedTesting')
  //pay attention to name casing here!
  .directive('infoDetails', function($compile) {
    return {
      template:"<span ng-click='displayPopover()' class='glyphicon glyphicon-info-sign'></span>",
      scope: {
        place: "="
      },
      link: function(scope, element) {
        scope.displayPopover = function(place) {
          var html = '<div>adding directive: location-info</div><div location-info address="place"></div>'
          var popoverContent = $compile(html)(scope);
          var options = {
            container: "body",
            content: popoverContent,
            placement: "right",
            trigger: "click",
            html: true
          };

          $(element).popover(options)
        }
      }
    }
  })

  .directive('locationInfo', function(){
    return {
      templateUrl: 'app/main/location-info.html',
      scope: {
        address:"="
      }
    }
  })

  .service('MainCtrlService', function(PlacesResource, PlacesImageResource){
    this.getMeAddresses = function(ctrlAddress, onCompletion) {
      var desiredPlace;
      PlacesResource.getPlaces({address: ctrlAddress})
      .$promise
      .then(function onSuccess(response), {
        var places = response.results;
        desiredPlace = places[0]
        var desiredId = places[0].place_id;

        //returning another promise here
        return PlacesImageResource.getImages({id: desiredId}).$promise;
      })
      .then(function onSecondResponse(secondResponse) {
        var returnObject = {
          place : desiredPlace
          placeUrl: secondResponse.imageUrls
        }

        onCompletion(returnObject);
      })
      .catch(function onError(errorResponse) {
        //handle all errors here
      })
    }

    this.getRequestsConcurrently = function() {
      var promiseOne = PlacesResource.getPlaces({address: '123'}).$promise;
      var promiseTwo = PlacesImageResource.getImages({id: '123'}).$promise;

      //can also do this with objects. keys instead of indexs for lines 70 and 71
      $q.all([promiseOne, promiseTwo])
      .then(function onSuccess(responses) {
        var responseOne = responses[0]
        var responseTwo = responses[1]
      })
      .catch(function onError(errorResponse) {

      })
    }
  })

  .service('GlobalSetting', function() {
    this.isDebug = false
  })

  .controller('MainCtrl', function (MainCtrlService, GlobalSetting, $compile, $scope, $log) {
    var self = this;

    $log.info("info log")
    $log.debug("debug log")
    $log.error("error log")
    $log.log("plain log log")

    self.logInfo = function() {
      $log.debug("debug log")
    }

    self.getPlaces = function() {
      MainCtrlService.getMeAddresses("123", function onCompletion(myPrettyResults) {
        self.data = myPrettyResults
      })
    }

    var html = '<a class="btn btn-lg btn-success" ng-click="ctrl.getPlaces()">Get Places!</a>'
    var compiledHtml = $compile(html)($scope);
    $("#getPlaces").append(compiledHtml)
  });
