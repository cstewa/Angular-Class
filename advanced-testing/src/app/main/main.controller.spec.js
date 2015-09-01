'use strict';

var sampleData = {
 "results" : [
    {
       "address_components" : [
          {
             "long_name" : "123",
             "short_name" : "123",
             "types" : [ "route" ]
          },
          {
             "long_name" : "Holguín",
             "short_name" : "Holguín",
             "types" : [ "administrative_area_level_1", "political" ]
          },
          {
             "long_name" : "Cuba",
             "short_name" : "CU",
             "types" : [ "country", "political" ]
          }
       ],
       "formatted_address" : "123, Cuba",
       "geometry" : {
          "bounds" : {
             "northeast" : {
                "lat" : 20.6815231,
                "lng" : -74.92940209999999
             },
             "southwest" : {
                "lat" : 20.5686501,
                "lng" : -75.7955575
             }
          },
          "location" : {
             "lat" : 20.6582941,
             "lng" : -75.3446802
          },
          "location_type" : "GEOMETRIC_CENTER",
          "viewport" : {
             "northeast" : {
                "lat" : 20.6815231,
                "lng" : -74.92940209999999
             },
             "southwest" : {
                "lat" : 20.5686501,
                "lng" : -75.7955575
             }
          }
       },
       "place_id" : "ChIJbRznkpQizI4R-5wRdx_CFJA",
       "types" : [ "route" ]
    }]
  }

describe('controllers', function(){
  var createController;
  var $httpBackend;

  beforeEach(module('advancedTesting'));

  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get("$httpBackend");

    $httpBackend
    .when("GET", 'http://maps.googleapis.com/maps/api/geocode/json?address=123')
    .respond(sampleData)

    //gives you reference to your main controller
    var $controller = $injector.get("$controller");
    createController = function() {
      return $controller("MainCtrl")
    }

  }));

  it('should save response data property', inject(function($controller) {
    var controller = createController();
    expect(controller.data).toBeUndefined();
    controller.getPlaces();
    $httpBackend.flush();

    expect(controller.data).toBeDefined();

    expect(controller.data[0].myAddress).toBeDefined
  }));
});
