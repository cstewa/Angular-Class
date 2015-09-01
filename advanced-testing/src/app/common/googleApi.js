(function(module){
  module.factory('PlacesResource', function($resource) {
    return $resource('http://maps.googleapis.com/maps/api/geocode/json', {}, {
      getPlaces: {
        method: 'GET',
        isArray: false
      }}
    )
  })
})(angular.module('GoogleApiModule'), []);