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

router.get('/', async (req, res) => {
  
  const custID = req.body.custID;

  try {
     
    //Get current acct_value of customer
    const getAcctValueQuery = 'select account_value from users where cust_id = ' + custID + ';';

    //Run query - fetch response
    var acctValue = await pool.query(getAcctValueQuery);
    var acctValueString = acctValue[0];

    //Get current acct_value of customer
    const setAcctValueQuery = 'select * from transaction where custID=' + custID + ';';

    //Run queries
    await pool.query(depositTableQuery, [custID, amount, dateStamp]);
    await pool.query(setAcctValueQuery);
    
  } catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    // [START_EXCLUDE]
    res.status(500).send('Unable to successfully insert transaction!').end();
    // [END_EXCLUDE]
  } */
  // [END cloud_sql_mysql_mysql_connection]

  res.send(`Succesfull connection!`).end();
});

module.exports = router;