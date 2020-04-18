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

    bpay.validatePayment(payment, function(err,response,data) {
        if(!err) {
            console.log(data)
            res.send(data);
        }
    });
});

module.exports = router;