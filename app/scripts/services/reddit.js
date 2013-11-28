'use strict';

angular.module('redditApp')
.service('Reddit', function Reddit() {

  this.config = {
    logged_in: false
  };

  this.getUrl = function(url) { 
    return "http://localhost:4567/" + url;
  };

  this.isLoggedIn = function() {
    return this.config.logged_in;
  };

  this.setConfig = function(key, value) {
    this.config[key] = value;
  };

  this.getConfig = function(key) {
    return this.config[key];
  };

  this.saveSession = function() {
    localStorage.setItem('configstr', JSON.stringify(this.config)) 
  };

  this.loadSession = function() { 
    var config = localStorage.getItem('configstr');
    if (config) {
      this.config = JSON.parse(config);
      console.log("Loaded a previous session."); 
    } else {
      console.log("Did not load any previous session.");
    }
  }
});
