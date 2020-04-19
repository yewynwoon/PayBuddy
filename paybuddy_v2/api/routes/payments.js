'use strict';

var sql = require('./api/sql.js');
var bpay = require('./api/bpay.js');

const express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

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
router.post('/validatePayment', function(req, res) {
    var payment = req.body.payment;
    var userID = req.body.userID;
    var addTransactQuery = 'insert into cust_bpay_payments (cust_id, biller_code, crn, amount) values ('+userID+','+payment.billerCode+','+payment.crn+','+payment.amount+');';
    var getAcctAmntQuery = 'select account_value from users where cust_id='+userID+';';
    
    console.log(addTransactQuery);
    console.log(getAcctAmntQuery);

    try {
        bpay.validatePayment(payment, function(err,response,data) {
            console.log('Validate payment');
            if(!err) {
                //console.log(data);

                /* sql.runQuery(addTransactQuery, function(err1, response1, data1) {
                    if(!err1) {
                        console.log(response1);

                        sql.runQuery(getAcctAmntQuery, function(err2, response2, data2) {
                            if(!err2) {
                                console.log(response2);

                                var oldAcctValue = response2[0].account_value;
                                var newAcctTotal = oldAcctValue - payment.amount;
                                var updateAcctAmntQuery = 'update users set account_value='+newAcctTotal+' where cust_id='+userID+';';

                                sql.runQuery(updateAcctAmntQuery, function(err3, response3, data3) {
                                    if(!err) {
                                        console.log(response3);
                                        res.end('OK');
                                    } else {
                                        console.log('Set account value sql error');
                                        res.status(500).end();
                                    }
                                });
                            } else {
                                console.log('Get account value sql error');
                                res.status(500).end();
                            }
                        });
                    } else {
                        console.log('Add transact sql error');
                        res.status(500).end();
                    }
                }); */
            } else {
                console.log('BPay Validate Payment error');
                res.status(500).end();
            }
        }); 
    } catch {
        console.log('Catch excpetion');
        res.status(500).end();
    }
});

module.exports = router;