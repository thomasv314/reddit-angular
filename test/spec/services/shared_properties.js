'use strict';

describe('Service: SharedProperties', function () {

  // load the service's module
  beforeEach(module('redditApp'));

  // instantiate service
  var SharedProperties;
  beforeEach(inject(function (_SharedProperties_) {
    SharedProperties = _SharedProperties_;
  }));

  it('should do something', function () {
    expect(!!SharedProperties).toBe(true);
  });

});
