'use strict';

angular.module('redditApp')
.service('Reddit', function Reddit($http) {

  this.config = {
    logged_in: false
  };

  this.postLogin = function(username, password, remember, successCb, errorCb) {
    
    var that = this
    , url = this.getUrl('api/login')
    , message = { 
      api_type: "json", 
      rem: remember,
      user: username,
      passwd: password
    };
    
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    
    $http.post(url, { data: message })
    .success(function(data) {
    
      if (data['json']['data']['cookie']) 
        that.setCookie(data['json']['data']['cookie']);
     
      if (data['json']['data']['modhash'])
        that.setModhash(data['json']['data']['cookie']);

      console.log($http.defaults.headers);
      successCb(data);      
    })
    .error(function(data, status, headers, config) {
      console.log("failed");
      errorCb(data, status, headers, config);
    })
  
  };

  this.getUserInfo = function(successCb, errorCb) {
    $http.get(this.getUrl('api/me.json'))
    .success(successCb)
    .error(errorCb)
  };

  this.setCookie = function(cookie) {
    $http.defaults.headers.common['Set-Cookie'] = "reddit_session="+cookie+";";
  };

  this.setModhash = function(hash) {
    $http.defaults.headers.common['X-Modhash'] = hash;
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
      if (this.config.cookie) 
        this.setCookie(this.config.cookie);
      if (this.config.modhash)
        this.setModhash(this.config.modhash);
      console.log("Loaded a previous session."); 
    } else {
      console.log("Did not load any previous session.");
    }
  }

});
