angular.module('lesson7')

.controller('OwnerContactCtrl', function($state, $urlRouter) {
  var self = this;
  self.contactName = "The Owner";
})

.controller('CEOContactCtrl', function() {
  var self = this;
  self.contactName = "The CEO";
})