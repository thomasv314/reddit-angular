'use strict';

angular.module('redditApp')
.controller('RedditPostCtrl', function ($scope, $location, $http, $window, $sce) {


  $scope.post_loaded = false;

  $scope.post_url = 'http://www.corsproxy.com/reddit.com'+$location.path()+".json";

  $scope.viewPost = function() {
    $window.location = $scope.post.url;
  };

  $http.get($scope.post_url).success(function(data) {
    $scope.post = data[0].data.children[0].data;
    $scope.post.date_short = new Date($scope.post.created*1000).formatShort(); 
    $scope.post_comments = data[1].data.children.map(function(obj) {
      obj.data.date = new Date(obj.data.created*1000);
      obj.data.date_short = obj.data.date.formatShort();
      return obj.data;
    });
    $scope.post_loaded = true;

    console.log($scope);
  });   

  $scope.postHtml = function(post) {
    return $sce.trustAsHtml(post.selftext_html);
  }

  $scope.commentHtml = function(comment) {
    return $sce.trustAsHtml(comment.body_html);
  }
});
