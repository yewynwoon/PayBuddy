'use strict';

const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// [START cloud_sql_mysql_mysql_create]
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

router.get('/:user_id', async (req, res) => {
  var userID = req.params.user_id;

  try {
     
    //Get current acct_value of customer
    const getAcctValueQuery = 'select account_value from users where cust_id = ' + userID + ';';

    //Get past transactions of customer
    const getPastDepositQuery = 'select deposit_id, amount, date_stamp from cust_deposit where cust_id=' + userID + ';';

    //Get past transactions of customer
    const getPastPaymentQuery = 'select bpay_payment_id, amount, date_stamp from cust_bpay_payments where cust_id=' + userID + ';';
    
    //Run query - fetch response
    var acctValue = await pool.query(getAcctValueQuery);
    var pastDeposits = await pool.query(getPastDepositQuery);
    var pastPayments = await pool.query(getPastPaymentQuery);

    console.log(userID);
    console.log(acctValue);
    console.log(pastDeposits);
    console.log(pastPayments);
    
  } catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    // [START_EXCLUDE]
    console.log(err);
    res.status(500).end('Unable to successfully insert transaction!');
    // [END_EXCLUDE]
  } 
  // [END cloud_sql_mysql_mysql_connection]

  res.end(JSON.stringify({userID: userID, acctValue: acctValue, pastDeposits: pastDeposits, pastPayments: pastPayments}));
});

module.exports = router;