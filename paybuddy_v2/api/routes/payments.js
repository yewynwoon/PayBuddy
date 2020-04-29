'use strict';

var bpay = require('./api/bpay.js');

var request = require('request-promise');
const express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

const mysql = require('promise-mysql');

let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: "root",
    password: "hello",
    database: "test",
    
    // If connecting via unix domain socket, specify the path
    //socketPath: '/cloudsql/paybuddy-jeremy:australia-southeast1:paybuddy-mysql-db',//${process.env.CLOUD_SQL_CONNECTION_NAME}',
    
    // If connecting via TCP, enter the IP and port instead
    host: '127.0.0.1',
    port: 1433,

    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
  });
};
createPool();

//Validate BPay Biller code
router.get('/biller/:billerCode', function(req,res) {
    var billerCode = req.params.billerCode;

    bpay.validateBillerCode(billerCode, function(err,response,data) {
        if(!err) {
            console.log(data)
            res.send(data);
        }
    });
});

//Validate BPay Payment
router.post('/validatePayment', async (req, res) => {
    var payment = req.body.payment;
    var userID = req.body.userID;
    var description = req.body.description;
    var amount = payment.amount;
    var dateStamp = new Date();

    //console.log(payment);
    
    try {
        //Get source user account value
        const getAcctValueQuery = 'select account_value from users where cust_id = ' + userID + ';';
        var acctValue = await pool.query(getAcctValueQuery);
    
        //Ensure source user exists & has sufficient funds
        if (acctValue[0] == null) {
          console.log('Incorrect src id');
          res.status(500).end('Incorrect src id');
        } else if (parseInt(acctValue[0].account_value) < amount) {
          console.log('Insufficient Funds');
          res.status(500).end('Insufficient Funds');
        }

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
                    "payments": [{
                        "tid": "1",
                        "payment": req.body.payment
                    }]
                }
            };
            request(options1)
            .then(function(res2) {
              console.log(res2);
            }).catch(function(err1) {
              console.log(err1);
              res.end(err1);   //PAYMENT VERIFICATION ERROR
            });
        }).catch(function(err) { 
            console.log(err);
            res.end(err);    //OAUTH ERROR
        });

    
        //Updated user account values
        const newCustAmt = parseInt(acctValue[0].account_value) - parseInt(amount);
    
        //Update user account balues
        const updateCustQuery = 'update users set account_value=' + newCustAmt + ' where cust_id=' + userID + ';';
        await pool.query(updateCustQuery);

        //Insert transaction record
        const insertTransact = 'insert into cust_bpay_payments (cust_id, biller_code, crn, amount, description, date_stamp) values (?,?,?,?,?,?);';
        await pool.query(insertTransact, [userID,payment.billerCode,payment.crn,payment.amount,description,dateStamp]);
    
        console.log('Success!');
        res.status(200).end('Success!');
    
    } catch (err) {
        console.log(err);
        res.status(500).end('Fail');
    }
});

module.exports = router;