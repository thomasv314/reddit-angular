'use strict';

angular.module('redditApp')
.controller('LoginCtrl', function ($scope, $http, $location, Reddit) {

  $scope.username = "";
  $scope.password = "";
  $scope.remember = false;

  $scope.has_errors = false;

  $scope.submitLogin = function() { 

    var url = Reddit.getUrl('api/login')
    , message = {
      api_type: "json",
      passwd: $scope.password,
      rem: $scope.remember,
      user: $scope.username
    };
    
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.post(url, { data: message }) 
    .success(function(data) {
      data = data.json;
      console.log(data);
      if (data.errors.length > 0) {
        $scope.has_errors = true;
        $scope.errors = "";
        for (var i = 0; i < data.errors.length; i++) {
         $scope.errors = $scope.errors + "\n" + data.errors[i][1];
        }
      } else {
        $scope.has_errors = false;
        $scope.errors = "";
        Reddit.setConfig('username', message.user); 
        Reddit.setConfig('cookie', data.data.cookie);
        Reddit.setConfig('modhash', data.data.modhash);
        Reddit.setConfig('logged_in', true);
        Reddit.saveSession();
        $location.path("/");
      } 
    })
    .error(function(data, status, headers, config) {
      console.log({ data: data, status: status, headers: headers, config: config });
    });

  }

});
