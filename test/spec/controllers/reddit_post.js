'use strict';

describe('Controller: RedditPostCtrl', function () {

  // load the controller's module
  beforeEach(module('redditApp'));

  var RedditPostCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RedditPostCtrl = $controller('RedditPostCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
