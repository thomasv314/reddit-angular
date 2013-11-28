'use strict';

angular.module('redditApp')
  .controller('RedditCtrl', function ($scope, $http, $routeParams, $location) {

    $scope.reddit_loaded = false;

    // Reddit Configuration 
    $scope.reddit = $routeParams.redditId;

    $scope.reddit_url = 'http://reddit.com/r/'+$scope.reddit+'.json';

    // Reddit Posts
    $scope.reddit_posts = [];

    // Fetch and set the reddit posts
    $http.get($scope.reddit_url).success(function(data) {
      $scope.reddit_posts = data.data.children.map(function(obj) {
        return obj.data;
      });
      $scope.reddit_loaded = true; 
    });

    // Called when a post is selected
    $scope.selectPost = function(post) {
      $location.path(post.permalink);
    };

  });
