'use strict';

// here's what I did to make this work...

// In Index.js add state:

// .state('edit', {
//         url:'edit/:userId',     <---- notice i put a placeholder called userId
//         templateUrl: 'app/add/add.html',
//         controller: 'AddCtrl',
//         controllerAs: 'addCtrl'
// })

// In main.html I removed  --> ui-sref="add"

// In Main Ctrl I added $state service and changed "editing" function to this:
//     self.editing = function(contact, index) {
//       $state.go('edit', {userId: index});   <-- this take me to the 'edit' state and will swap out the placeholder from above
//     }

// Last step in ContactFormController I removed all the ContactsArray code to check for isEditing and replace it with this....

//   if ($stateParams.userId) {  <-- don't forget to ask for $stateParams service.
//     self.isEditing = true;
//     self.contact = angular.copy(ContactsArray.contacts[$stateParams.userId]);
//   }


// $stateParams service will give you the userId that was passed from the MainCtrl in the URL.  Notice the URL in this view.

// Let me know if you have any questions
// George Dagher

angular.module('lesson7', ['ngResource', 'ui.router', 'ui.bootstrap']) .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      }).state('about', {
        url:'/about',
        templateUrl: 'app/about/about.html'
        // controller: 'AboutSectionCtrl',
        // controllerAs: 'abtCtrl'
      }).state('contact', {
        url:'/contact',
        templateUrl: 'app/contact/contact.html'
      })
      .state('contact.owner', {
        url:'/owner',
        templateUrl: 'app/contact/contactDetail.html',
        controller: 'OwnerContactCtrl',
        controllerAs: 'contactDetailCtrl'
      })
      .state('contact.ceo', {
        url:'/ceo',
        templateUrl: 'app/contact/contactDetail.html',
        controller: 'CEOContactCtrl',
        controllerAs: 'contactDetailCtrl'
      })


    $urlRouterProvider.otherwise('/');
  })
;
