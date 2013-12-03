'use strict';

angular.module('redditApp')
.controller('SidebarCtrl', function ($rootScope, $scope, Reddit) {

  $scope.name = "lol";

  $scope.reddit_logged_in = Reddit.isLoggedIn();

  $scope.wat = function() {
    console.log('wat');
  };

  $rootScope.$on('user:loggedIn', function() { 
    $scope.reddit_logged_in = true;
    console.log("Sidebar knows.");
  });


});
