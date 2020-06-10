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

router.post('/', async (req, res) => {
  var srcEmail = req.body.src_email;
  var destID = req.body.dest_id;
  var amount = parseInt(req.body.amount);
  var descrip = req.body.descrip;
  var dateStamp = new Date();

  try {
    //Get source user account value
    const getSrcAcctValueQuery = 'select cust_id, account_value from users where email="'+srcEmail+'";';
    var srcAcctValue = await pool.query(getSrcAcctValueQuery);

    //Ensure source user exists & has available funds
    if (srcAcctValue[0] == null) {
      console.log('Incorrect src id');
      res.status(500).end('Incorrect src id');
      return;
    } else if (parseInt(srcAcctValue[0].account_value) < amount) {
      console.log('Insufficient Funds');
      res.status(500).end('Insufficient Funds');
      return;
    }

    //Get dest user account value
    const getDstAcctValueQuery = 'select account_value from users where cust_id='+destID+';';
    var dstAcctValue = await pool.query(getDstAcctValueQuery);

    //Ensure source user exists
    if (dstAcctValue[0] == null) {
      console.log('Incorrect dst id');
      res.status(500).end('Incorrect dst id');
      return;
    }

    //Updated user account values
    const newSrcCustAmt = parseInt(srcAcctValue[0].account_value) - parseInt(amount);
    const newDstCustAmt = parseInt(dstAcctValue[0].account_value) + parseInt(amount);

    //Update user account balues
    const updateSrcCust = 'update users set account_value='+newSrcCustAmt+' where email="'+srcEmail+'";';
    const updateDstCust = 'update users set account_value=' + newDstCustAmt + ' where cust_id='+destID+';';
    
    await pool.query(updateSrcCust);
    await pool.query(updateDstCust);
    
    //Insert transaction record
    const insertTransact = 'insert into cust_transfer (src_cust_id, dest_cust_id, amount, description, date_stamp) values (?,?,?,?,?);';
    await pool.query(insertTransact, [srcAcctValue[0].cust_id,destID,amount,descrip,dateStamp]);

    console.log('Success!');
    res.status(200).end('Success!');

  } catch (err) {
    console.log(err);
    res.status(500).end('Fail');
  }
});

module.exports = router;