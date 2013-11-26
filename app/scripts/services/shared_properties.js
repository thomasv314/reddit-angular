'use strict';

angular.module('redditApp')
.service('SharedProperties', function SharedProperties() {

  this.config = {};

  this.setConfig = function(key, value) {
    this.config[key] = value;
  };

  this.getConfig = function(key) {
    return this.config[key];
  }
});
