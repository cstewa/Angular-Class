'use strict';

angular.module('lesson8')

  .factory('GoogleResourceFactory', function($resource) {
    return $resource('http://maps.googleapis.com/maps/api/geocode/json')
  })

  .factory('UserResourceFactory', function($resource) {
    return $resource('/assets/JSON/sampleData.json')
  })

  .factory('UserFriendResourceFactory', function($resource) {
    return $resource('/assets/JSON/:userId/profile.json', {}, {
      getFriends: {
        method: "GET",
        isArray: true
      },
      deleteFriend: {
        method: "DELETE",
        isArray: false
      }
    })
  })

  .controller('MainCtrl', function ($scope, $location, $anchorScroll, $q, UserResourceFactory, UserFriendResourceFactory, GoogleResourceFactory, $timeout) {
    var self = this;

    self.getResults = function(query) {
      GoogleResourceFactory.get({address: query}, function(response) {
        self.addresses = response.results;
      })
    }

    self.getUsers = function() {
      var myResource = UserResourceFactory;

      myResource.query(undefined, function(response) {
        self.users = response;
      })
    }

    self.getFriends = function(user) {
      UserFriendResourceFactory.getFriends({userId: user._id})
        .$promise
        .then(function onSuccess(response) {
          user.friends = response;
        }, function onError(response) {

        });
    }

    //would use deferred in the timeout for the resource
    var deferred = $q.defer();

    $timeout(function() {
      deferred.notify("status update")
      //if user accepts
      deferred.resolve("resolved")
      //if user cancels
        deferred.reject("rejected")
    }, 3000)

    deferred.promise.then(function onSuccess(successMessage) {
      console.log("success")
    }, function onError(errorMessage) {

    }, function onNotification(notificationMessage) {

    });

    self.onSubmit = function() {

    }

    self.selectOptions = [
      {
        name: "California",
        abvr: "CA"
      },
      {
        name: "Michigan",
        abvr: "MI"
      }
    ]
    console.log(self.myForm)
  });
