'use strict';

angular.module('redditApp')
.controller('MainCtrl', function ($scope, $location, $http, Reddit) {

  $scope.reddit_loaded = false;
  $scope.reddit_url = Reddit.getUrl('/.json');

  $http.get($scope.reddit_url).success(function(data) {
    $scope.reddit_loaded = true;
    $scope.reddit_posts = data.data.children.map(function(obj) {
      return obj.data;
    });
    console.log($scope.reddit_posts);
  });

  $scope.search = function() {
    $location.path('/r/'+$scope.search_reddit);
  };

  $scope.toggleMenu = function() {
    $scope.sideMenuController.toggleLeft();
  };

  $scope.navigatePost = function(post) {
    $location.path(post.permalink);
  };

  $scope.navigateLogIn = function() { 
    $location.path('/login');
  };

  $scope.navigateBrowse = function() { 
    $location.path('/browse');
  };

});
