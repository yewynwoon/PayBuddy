'use strict';

const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');

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



async function getAccountBalance(userID) {
    try {
        const getAcctValueQuery = 'select account_value from users where cust_id = ' + userID + ';';
    
        var acctValue = await pool.query(getAcctValueQuery);
        
        console.log(acctValue[0]);
        
        return acctValue[0];
      } catch (err) {
        return null;
      }
}

router.get('/userAcctBalance/:user_id', async (req, res) => {

    var userID = req.params.user_id;

    console.log(userID);

    var userAcctBalance = await getAccountBalance(userID);

    console.log(userAcctBalance);

    if (userAcctBalance == null) {
        res.status(500).send('Unable to successfully insert transaction!').end();
    } else {
        res.status(200).send(userAcctBalance).end();
    }
});

router.post('/validatePayment', async (req, res) => {
  
});

module.exports = router;