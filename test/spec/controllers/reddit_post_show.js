'use strict';

describe('Controller: RedditPostShowCtrl', function () {

  // load the controller's module
  beforeEach(module('redditApp'));

  var RedditPostShowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RedditPostShowCtrl = $controller('RedditPostShowCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
