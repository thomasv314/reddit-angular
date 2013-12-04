'use strict';

angular.module('redditApp')
.controller('SidebarCtrl', function ($rootScope, $scope, $location, Reddit) {

  $scope.username = Reddit.getConfig('username');

  $scope.reddit_logged_in = Reddit.isLoggedIn();

  $scope.navigateLogin = function() { 
    $location.path('login');
  }

  $scope.navigateProfile = function() {
    $location.path('u/'+$scope.username);
  };

  $scope.navigateMain = function() { 
    $location.path('/');
  };

  $rootScope.$on('user:loggedIn', function() { 
    $scope.reddit_logged_in = true;
    $scope.username = Reddit.getConfig('username'); 
    console.log("Sidebar knows.");
  });


});
