'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

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

router.get('/userAcctBalane/:user_id', async (req, res) => {

    const userID = req.params.user_id;

    try {
     
        //Get current acct_value of customer
        const getAcctValueQuery = 'select account_value from users where cust_id = ' + userID + ';';
    
        //Run query - fetch response
        var acctValue = await pool.query(getAcctValueQuery);
        
        console.log(acctValue[0]);
        
        res.send(JSON.stringify({acctValue: acctValue})).end();
        
      } catch (err) {
        // If something goes wrong, handle the error in this section. This might
        // involve retrying or adjusting parameters depending on the situation.
        // [START_EXCLUDE]
        res.status(500).send('Unable to successfully insert transaction!').end();
        // [END_EXCLUDE]
      }
});

router.post('/validatePayment', async (req, res) => {
  
});

module.exports = router;