'use strict';

angular.module('redditApp')
.controller('MainCtrl', function ($scope, $location) {

  $scope.search = function() {
    $location.path('/r/'+$scope.search_reddit);
  };

});
