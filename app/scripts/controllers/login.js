'use strict';

angular.module('redditApp')
.controller('LoginCtrl', function ($rootScope, $scope, $http, $location, Reddit) {

  $scope.username = "";
  $scope.password = "";
  $scope.remember = false;
  $scope.reddit_logged_in = Reddit.isLoggedIn();
  $scope.has_errors = false;

  $scope.submitLogin = function() { 
    console.log('hi');
    var onSuccess = function(data) {
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
        $scope.reddit_logged_in = true;
        Reddit.setConfig('username', $scope.username); 
        Reddit.setConfig('cookie', data.data.cookie);
        Reddit.setConfig('modhash', data.data.modhash);
        Reddit.setConfig('logged_in', true);
        Reddit.saveSession();
        
        Reddit.getUserInfo(function(data) {
          console.log("Data", data);
        }, function(data, status, headers, config) {

        });

        $rootScope.$broadcast('user:loggedIn');
                

        $location.path("/");
      };
    };

      var onError = function(data, status, headers, config) {
        console.log({ data: data, status: status, headers: headers, config: config });
      };

      Reddit.postLogin($scope.username, $scope.password, $scope.remember, onSuccess, onError);
      /*
         Reddit.login
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
$scope.reddit_logged_in = true;
Reddit.setConfig('username', message.user); 
Reddit.setConfig('cookie', data.data.cookie);
Reddit.setConfig('modhash', data.data.modhash);
Reddit.setConfig('logged_in', true);
Reddit.saveSession();
$rootScope.$broadcast('user:loggedIn');
$location.path("/");
} 
})
.error(function(data, status, headers, config) {
console.log({ data: data, status: status, headers: headers, config: config });
});
*/
    }

});
