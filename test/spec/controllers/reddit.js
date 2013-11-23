'use strict';

describe('Controller: RedditCtrl', function () {

  // load the controller's module
  beforeEach(module('redditApp'));

  var RedditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RedditCtrl = $controller('RedditCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
