'use strict';

angular.module('redditApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ionic'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/r/:redditId', { 
        templateUrl: 'views/reddit.html',
        controller: 'RedditCtrl'
      })
      .when('/r/:redditId/comments/:postId/:else', { 
        templateUrl: 'views/reddit_post.html',
        controller: 'RedditPostCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location) {

    Date.prototype.formatShort = function() {
        return (this.getMonth()+1) +"/"+this.getDay()+"/"+this.getFullYear();
    };

    $rootScope.goHome = function() {
      $location.path('/');
    } 
  });
