'use strict';

angular.module('redditApp')
.controller('SidebarCtrl', function ($scope, Reddit) {
 
  $scope.name = "lol";

  $scope.reddit_logged_in = Reddit.isLoggedIn();

});
