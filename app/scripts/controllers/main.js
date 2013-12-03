'use strict';

angular.module('redditApp')
.controller('MainCtrl', function ($scope, $location, $http, Reddit) {

  $scope.reddit_loaded = false;
  $scope.reddit_url = Reddit.getUrl('/.json');

  // Load the reddit posts for the front page
  $http.get($scope.reddit_url).success(function(data) {
    $scope.reddit_loaded = true;
    $scope.reddit_posts = data.data.children.map(function(obj) {
      return obj.data;
    });
    console.log($scope.reddit_posts);
  });

  // Navigate to a specific subreddit
  // Show the side menu
  $scope.toggleMenu = function() {
    $scope.sideMenuController.toggleLeft();
  };

  // Navigate someplace
  $scope.navigatePost = function(post) {
    $location.path(post.permalink);
  };

  $scope.navigateLogIn = function() { 
    $location.path('login');
  };

  $scope.navigateBrowse = function() { 
    $location.path('browse');
  };

  $scope.navigateSubreddit = function() {
    $location.path('r/'+$scope.search_reddit);
  };


});
