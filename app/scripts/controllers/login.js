'use strict';

angular.module('redditApp')
.controller('LoginCtrl', function ($scope, $http, Reddit) {

  $scope.submitLogin = function() { 
    $http.post(Reddit.getUrl('/api/login'), data).
      success(function(data) {
      console.log("DATA SUCCESS", data);
    }).
      error(function(data, status, headers, config) {
      console.log({ data: data, status: status, headers: headers, config: config });
    });
  }
});
