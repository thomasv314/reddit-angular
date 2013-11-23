'use strict';

angular.module('redditApp')
.controller('RedditPostCtrl', function ($scope, $location, $http, $window, $sce) {


  $scope.post_loaded = false;

  $scope.post_url = 'http://www.corsproxy.com/reddit.com'+$location.path()+".json";

  $scope.viewPost = function() {
    $window.location = $scope.post.url;
  };

  $scope.htmlDecode = function(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  $scope.commentHtml = function(comment) {
    return $scope.htmlDecode(comment.body_html);
  };

  $http.get($scope.post_url).success(function(data) {
    // Set the Post
    $scope.post = data[0].data.children[0].data;
    // Compute the date of the Post
    $scope.post.date_short = new Date($scope.post.created*1000).formatShort(); 
    // Set the Post Text
    if ($scope.post.selftext_html) {
      $scope.selftext = $scope.htmlDecode($scope.post.selftext_html);
      console.log($scope.selftext); 
    }
    // Parse the array of comments
    $scope.post_comments = data[1].data.children.map(function(obj) {
      obj.data.date = new Date(obj.data.created*1000);
      obj.data.date_short = obj.data.date.formatShort();
      return obj.data;
    });
    $scope.post_loaded = true;

    console.log($scope);
  });   

});
