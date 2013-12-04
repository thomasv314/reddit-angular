'use strict';

angular.module('redditApp')
  .controller('ProfileCtrl', function ($scope, $routeParams, Reddit) {
    
    $scope.username = $routeParams.username;
    
    var onUserSuccess = function(data) {
     console.log("loaded user...", data);
    }

    var onUserError = function(data, status, headers, config) {
      alert("Error retrieving user information on profile.");
    }
   
    Reddit.getUserInfo($scope.username, onUserSuccess, onUserError);

  });
