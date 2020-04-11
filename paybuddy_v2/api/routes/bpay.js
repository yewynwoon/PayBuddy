'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');
var jwtDecode = require('jwt-decode');
var jwt = require('jwt-simple');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/biller/:billerCode', async (req, res) => {
  const options = {
    url: 'https://sandbox.api.bpaygroup.com.au/oauth/token',
    method: 'POST',
    headers: {
        Authorization: 'Basic WU1xS0JOSmI3c2dtQXlJcDZjdkdtc0t5UkZObGpBWWo6RkQ5S0JPNWNXZnNBajV1cw=='
    },
    form: {
        client_id: 'YMqKBNJb7sgmAyIp6cvGmsKyRFNljAYj',
        grant_type: 'client_credentials'
    },
    json: true
  };
    
  request(options)
  .then(function(res1) {

    const token = 'Bearer ' + res1.access_token;
    const url = 'https://sandbox.api.bpaygroup.com.au/payments/v1/biller/' + req.params.billerCode;
    
    const options1 = {
      url: url,
      method: 'GET',
      headers: {
        Authorization: token,
        Accept: 'application/json'
      }
    };
    request(options1)
    .then(function(res2) {
      console.log(res2);
      res.send(res2).end();
    })
    .catch(function(err1) {
      console.log(err1);
      res.send(err1).end();   //BILLER ERROR
    });
  })
  .catch(function(err) { 
      res.send(err).end();    //OAUTH ERROR
  });
});

router.post('/validatePayment', async (req, res) => {
  const options = {
    url: 'https://sandbox.api.bpaygroup.com.au/oauth/token',
    method: 'POST',
    headers: {
        Authorization: 'Basic WU1xS0JOSmI3c2dtQXlJcDZjdkdtc0t5UkZObGpBWWo6RkQ5S0JPNWNXZnNBajV1cw=='
    },
    form: {
        client_id: 'YMqKBNJb7sgmAyIp6cvGmsKyRFNljAYj',
        grant_type: 'client_credentials'
    },
    json: true
  };
    
  request(options)
  .then(function(res1) {
    const options1 = {
      url: 'https://sandbox.api.bpaygroup.com.au/payments/v1/validatepayments',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + res1.access_token,
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      json: {
        "payments": [
          {
            "tid": "1",
            "payment": req.body.payment
          }
        ]
      }
    };
    request(options1)
    .then(function(res2) {
      console.log(res2);
      res.send(res2).end();
    })
    .catch(function(err1) {
      console.log(err1);
      res.send(err1).end();   //PAYMENT VERIFICATION ERROR
    });
  })
  .catch(function(err) { 
      res.send(err).end();    //OAUTH ERROR
  });
});

module.exports = router;