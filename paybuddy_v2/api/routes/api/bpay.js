var request = require('request-promise');

/* function getTokenID() {
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

  request(options, function (err, res, body) {
    console.log(body.access_token);
    return body.access_token;
  });
} */

var validateBillerCode =  function validateBillerCode(billerCode, cb) {
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

  request(options, function (err, res, body) {

    const token = 'Bearer ' + body.access_token;
    const url = 'https://sandbox.api.bpaygroup.com.au/payments/v1/biller/' + billerCode;
    
    const options1 = {
      url: url,
      method: 'GET',
      headers: {
        Authorization: token,
        Accept: 'application/json'
      }
    };

    request(options1, function (err1, res1, body1) {
      cb(err1,res1,body1); // callback function
    });
  });
}

var validatePayment =  function validatePayment(payment, cb) {
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

  request(options, function (err, res, body) {
    const options1 = {
      url: 'https://sandbox.api.bpaygroup.com.au/payments/v1/validatepayments',
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + body.access_token,
        Accept: 'application/json',
        'Content-Type': "application/json"
      },
      json: {
        "payments": [
          {
            "tid": "1",
            "payment": payment
          }
        ]
      }
    };

    request(options1, function (err1, res1, body1) {
      cb(err1,res1,body1); // callback function
    });
  });
}

var serviceObject = {
  "validateBillerCode":validateBillerCode,
  "validatePayment":validatePayment
}

module.exports = serviceObject;
//module.exports = validateBillerCode; /* {validateBillerCode, validatePayment}; */