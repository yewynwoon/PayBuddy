'use strict';


var sql = require('./api/sql.js');
var sqlPool = require('./api/sqlPool.js');

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

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Get user account balance
router.get('/acctBalance/:user_id', async (req, res) => {
  var userID = req.params.user_id;
  var query = 'select account_value from users where cust_id=' + userID + ';';

  sql.runQuery(query, function(err,response,data) {
      if(!err) {
          console.log(response)
          res.send(response);
      }
  });
});

router.get('/accBalance/:user_id', async (req, res) => {
  var userID = req.params.user_id;
  var query = 'select account_value from users where cust_id=' + userID + ';';

  try {
    //Run query - fetch response
    var acctValue = await sqlPool.query(query);

    console.log(userID);
    console.log(acctValue);
  } catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    // [START_EXCLUDE]
    res.status(500).end('Unable to successfully insert transaction!');
    // [END_EXCLUDE]
  } 
  // [END cloud_sql_mysql_mysql_connection]

  res.end(JSON.stringify({userID: userID, acctValue: acctValue}));
});


module.exports = router;