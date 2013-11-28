'use strict';

angular.module('redditApp')
.service('Reddit', function Reddit() {

  this.config = {
    loggedIn: false
  };

  this.getUrl = function(url) { 
    return "http://localhost:4567/" + url;
  };

  this.isLoggedIn = function() {
    return this.config.loggedIn;
  };

  this.setConfig = function(key, value) {
    this.config[key] = value;
  };

  this.getConfig = function(key) {
    return this.config[key];
  };

});
