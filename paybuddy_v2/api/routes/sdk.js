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

router.get('/accBalance/email/:user_email', async (req, res) => {
    var userEmail = req.params.user_email;
    var query = 'select account_value from users where email="' + userEmail + '";';
    
    try {
      //Run query - fetch response
      var acctValue = await pool.query(query);
  
      console.log(acctValue);
  
      res.status(200).end(JSON.stringify({acctValue: acctValue}));
    } catch (err) {
      res.status(500).end('Unable to successfully insert transaction!');
    }
});

router.get('/merchantName/:merch_id', async (req, res) => {
    var merchID = req.params.merch_id;
    var query = 'select cname from merchants where merchant_id="' + merchID + '";';
    
    console.log(query)

    try {
      //Run query - fetch response
      var name = await pool.query(query);
  
      console.log(name);
  
      res.status(200).end(JSON.stringify({name: name}));
    } catch (err) {
      res.status(500).end('Unable to successfully insert transaction!');
    }
});

router.post('/verifyPayment', async (req, res) => {
    var srcEmail = req.body.user_email;
    var merchID = req.body.merch_id;
    var amount = parseInt(req.body.amount);
    var descrip = req.body.descrip;
  
    try {
      //Get source user account value
      const getSrcAcctValueQuery = 'select cust_id, account_value from users where email = ' + srcEmail + ';';
      var srcAcctValue = await pool.query(getSrcAcctValueQuery);

      console.log(srcAcctValue[0])

      //var srcID = srcAcctValue[0]
  
      //Ensure source user exists & has available funds
      if (srcAcctValue[0] == null) {
        console.log('Incorrect src id');
        res.status(500).end('Incorrect src id');
      } else if (parseInt(srcAcctValue[0].account_value) < amount) {
        console.log('Insufficient Funds');
        res.status(500).end('Insufficient Funds');
      }

      //Get dest user account value
      const getDstAcctValueQuery = 'select account_value from merchants where merchant_id="'+merchID+'";';
      var dstAcctValue = await pool.query(getDstAcctValueQuery);
  
      //Ensure dest merch exists
      if (dstAcctValue[0] == null) {
        console.log('Incorrect dst id');
        res.status(500).end('Incorrect dst id');
      }
  
      //Updated user account values
      const newSrcCustAmt = parseInt(srcAcctValue[0].account_value) - parseInt(amount);
      const newDstMerchAmt = parseInt(dstAcctValue[0].account_value) + parseInt(amount);
  
      //Update user account balues
      const updateSrcCust = 'update users set account_value=' + newSrcCustAmt + ' where email=' + srcEmail + ';';
      const updateMerchCust = 'update users set account_value=' + newDstMerchAmt + ' where cust_id=' + destID + ';';
      
      await pool.query(updateSrcCust);
      await pool.query(updateMerchCust);
      
      //Insert transaction record
      const insertTransact = 'insert into cust_merchant_payment (cust_id, merchant_id, amount, description) values (?,?,?,?,?);';
      await pool.query(insertTransact, [srcID,merchID,amount,descrip]);
  
      console.log('Success!');
      res.status(200).end('Success!');
  
    } catch (err) {
      console.log(err);
      res.status(500).end('Fail');
    }
  });

module.exports = router;