'use strict';
const config = require('../config');
const expect = require('chai').expect

// get the url of a micro served microService
const listen = require('test-listen')

// http library
const micro = require('micro')
const got = require('got');

describe(`the endpoint facing the web`, function() {
  this.timeout(10000);
  let url = null;

  beforeEach(async () => {
    // setup simple micro service
    const microService = require('../../')
    const server = micro(microService)
    url =  await listen(server)
    await config.initDB();
    console.log('done');
    // done();
  });

  afterEach(async () => {
    await config.disConnectDB();
  })

  describe('GET /', () => {

    it(`returns status code 200`, async () => {
      let res = null;
      try {
        res = await got(url + '/auth/login', {
          method: 'post',
          json: true,
          headers: {'content-type': 'application/json'},
          body: {email: 'test@gmail.com', password: 'asfd'}
        });
      } catch (e) {
        res = e;
      }
      expect(res.statusCode).to.equal(400)
    })
  })
})