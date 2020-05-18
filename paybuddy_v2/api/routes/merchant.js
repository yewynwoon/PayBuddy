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

router.post('/login', async (req, res) => {

    try {
      const getMerchDetails = 'select merchant_id, password from merchants where email="' + req.body.uname + '";';
  
      //Run query - fetch response
      var merchDetails = await pool.query(getMerchDetails);
  
      if (merchDetails.length < 1) {
        res.status(403).send({message: 'Unkown E-Mail'}).end();
      }
      else if (merchDetails[0].password === req.body.pword) {
        res.status(200).send({response: merchDetails[0]}).end();
      }
      else {
        res.status(403).send({message: 'Incorrect Password'}).end();
      }
    } catch (err) {
      res.status(500).send('Connection error!').end();
    }
});

//Get merchant apps
router.get('/apps/:merch_id', async (req, res) => {
  var merchID = req.params.merch_id;
  var query = 'select merchant_app_id, name from merchant_apps where merchant_id="' + merchID + '";';

  try {

    var merchApps = await pool.query(query);
    res.status(200).send({message: merchApps}).end();

  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
  
});


/* //Get user account balance
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
 */


module.exports = router;