'use strict';

angular.module('redditApp')
  .controller('RedditPostCtrl', function ($scope, $location, $http) {
    
    $scope.post_url = 'http://www.corsproxy.com/reddit.com'+$location.path()+".json";
    
    $http.get($scope.post_url).success(function(data) {
      $scope.post = data[0].data.children[0].data;
      $scope.post_comments = data[1].data.children.map(function(obj) {
        return obj.data;
      });
    });   

    
  });
