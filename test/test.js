var supertest = require("supertest");
var should = require("should");
const getFromZendeskAPI = require("../api/zendesk");

describe('Authentication', function() {

  it('errors if wrong basic auth', function(done) {
    getFromZendeskAPI.get()
    .auth('incorrect', 'credentials')
    .expect(401, done)
  });
});