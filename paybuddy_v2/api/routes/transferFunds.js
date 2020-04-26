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
  var srcID = req.body.src_id;
  var destID = req.body.dest_id;
  var amount = req.body.amount;
  var descrip = req.body.descrip;
  var dateStamp = new Date();

  try {
     
    //Get current acct_value of customer
    const query = 'insert into cust_transfer (src_cust_id, dest_cust_id, amount, description, date_stamp) values (?,?,?,?,?);';

    //Get current acct_value of customer
    const getAcctValueQuery = 'select account_value from users where cust_id = ' + srcID + ';';

    //Run query - fetch response
    var oldAcctValue = await pool.query(getAcctValueQuery);
    var newAcctTotal = oldAcctValue[0].account_value + amount;

    //Get current acct_value of customer
    const setAcctValueQuery = 'update users set account_value=' + newAcctTotal + ' where cust_id=' + srcID + ';';
    await pool.query(setAcctValueQuery);

    //Run query - fetch response
    await pool.query(query, [srcID,destID,amount,descrip,dateStamp]);

    /* console.log(userID);
    console.log(acctValue);
    console.log(pastDeposits);
    console.log(pastPayments); */
     
  } catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    // [START_EXCLUDE]
    console.log(err);
    res.status(500).end('Unable to successfully insert transaction!');
    // [END_EXCLUDE]
  } 
  // [END cloud_sql_mysql_mysql_connection]

  res.status(200).send(`Succesfull insertion!`).end();
});

module.exports = router;