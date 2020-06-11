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

router.get('/:email', async (req, res) => {
  var email = req.params.email;

  try {
     
    //Get current acct_value of customer
    const getAcctValueQuery = 'select account_value from users where email="'+email+'";';

    //Get past deposits of customer
    const getPastDepositQuery = 'select cust_deposit.amount as amount, cust_deposit.date_stamp as date_stamp, concat("Deposit: ", cust_deposit.description) as description, "credit" as type from users inner join cust_deposit on users.cust_id = cust_deposit.cust_id where users.email="'+email+'";';
    
    //Get past payments of customer
    const getPastPaymentQuery = 'select cust_bpay_payments.amount as amount, cust_bpay_payments.date_stamp as date_stamp, concat("Payemnts: ", cust_bpay_payments.description) as description, "debit" as type from users inner join cust_bpay_payments on users.cust_id = cust_bpay_payments.cust_id where users.email="'+email+'";';
    
    //Get past transfers of customer
    const getPastTransferQuery = 'select cust_transfer.amount as amount, cust_transfer.date_stamp as date_stamp, concat("Transfer: ", cust_transfer.description) as description, "debit" as type from users inner join cust_transfer on users.cust_id = cust_transfer.src_cust_id where users.email="'+email+'";';
    
    //Run query - fetch response
    var acctValue = await pool.query(getAcctValueQuery);
    var pastDeposits = await pool.query(getPastDepositQuery);
    var pastPayments = await pool.query(getPastPaymentQuery);
    var pastTransfers = await pool.query(getPastTransferQuery);

    var transactions = pastDeposits.concat(pastPayments).concat(pastTransfers);

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

    res.end(JSON.stringify({acctValue: acctValue, transactions: lastTenTransacts}));
    
  } catch (err) {
    console.log(err);
    res.status(500).end('Unable to successfully insert transaction!');
  }
});

module.exports = router;