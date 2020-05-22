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

router.get('/:user_email', async (req, res) => {
  var userEmail = req.params.user_email;

  try {

    const userIDQuery = 'select cust_id from users where email="'+userEmail+'";';
    var userID = await pool.query(userIDQuery);
    userID = userID[0].cust_id

    console.log(userID)
     
    //Get current acct_value of customer
    const getAcctValueQuery = 'select account_value from users where cust_id='+userID+';';

    //Get past deposits of customer
    const getPastDepositQuery = 'select amount, date_stamp, concat("Deposit: ", description) as description, "credit" as type from cust_deposit where cust_id='+userID+';';

    //Get past payments of customer
    const getPastPaymentQuery = 'select amount, date_stamp, concat("Payemnts: ", description) as description, "debit" as type from cust_bpay_payments where cust_id='+userID+';';
    
    //Get past transfers of customer
    const getPastTransferQuery = 'select amount, date_stamp, concat("Transfer: ", description) as description, "debit" as type from cust_transfer where src_cust_id='+userID+';';
    
    //Get past payments to merchants
    const getPastMerchPayemntQuery = 'select amount, date_stamp, concat("Payment: ", description) as description, "debit" as type from cust_merchant_payment where cust_id='+userID+';';

    //Run query - fetch response
    var acctValue = await pool.query(getAcctValueQuery);
    var pastDeposits = await pool.query(getPastDepositQuery);
    var pastPayments = await pool.query(getPastPaymentQuery);
    var pastTransfers = await pool.query(getPastTransferQuery);
    var pastMerchPayments = await pool.query(getPastMerchPayemntQuery);

    var transactions = pastDeposits.concat(pastPayments).concat(pastTransfers).concat(pastMerchPayments);

    function compare(a, b) {

      const bandA = a.date_stamp;
      const bandB = b.date_stamp;

      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison * -1;
    }
    
    transactions.sort(compare);

    var lastTenTransacts = transactions.slice(0,13);

    //console.log(transactions);

    /* console.log(userID);
    console.log(acctValue);
    console.log(pastDeposits);
    console.log(pastPayments);
    console.log(pastTransfers); */

    res.end(JSON.stringify({userID: userID, acctValue: acctValue, transactions: lastTenTransacts}));
    
  } catch (err) {
    console.log(err);
    res.status(500).end('Unable to successfully insert transaction!');
  }
});

module.exports = router;