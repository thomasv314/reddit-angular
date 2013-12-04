'use strict';

angular.module('redditApp', [
               'ngCookies',
               'ngResource',
               'ngSanitize',
               'ngRoute',
               'ionic'
], 
function($httpProvider) {
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

  // Override $http service's default transformRequest
  $httpProvider.defaults.transformRequest = [function(data)
    {
      /**
       * The workhorse; converts an object to x-www-form-urlencoded serialization.
       * @param {Object} obj
       * @return {String}
       */ 
      var param = function(obj)
      {
        var query = '';
        var name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj)
          {
            value = obj[name];

            if(value instanceof Array)
              {
                for(i=0; i<value.length; ++i)
                {
                  subValue = value[i];
                  fullSubName = name + '[' + i + ']';
                  innerObj = {};
                  innerObj[fullSubName] = subValue;
                  query += param(innerObj) + '&';
                }
              }
              else if(value instanceof Object)
                {
                  for(subName in value)
                    {
                      subValue = value[subName];
                      fullSubName = name + '[' + subName + ']';
                      innerObj = {};
                      innerObj[fullSubName] = subValue;
                      query += param(innerObj) + '&';
                    }
                }
                else if(value !== undefined && value !== null)
                  {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                  }
          }

          return query.length ? query.substr(0, query.length - 1) : query;
      };

      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];              
})
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
  .when('/u/:username', {
    templateUrl: 'views/profile.html',
    controller: 'ProfileCtrl'
  })
  .when('/login', {
    templateUrl: 'views/login.html',
    controller: 'LoginCtrl'
  })
  .when('/browse', {
    templateUrl: 'views/browse.html',
    controller: 'BrowseCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
})
.run(function($rootScope, $location, Reddit) {
 
  
  Reddit.loadSession();

  Date.prototype.formatShort = function() {
    return (this.getMonth()+1) +"/"+this.getDay()+"/"+this.getFullYear();
  };

  $rootScope.goHome = function() {
    $location.path('/');
  } 
});

