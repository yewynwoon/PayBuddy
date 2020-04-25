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
//router.get('/:user_id/:user_id2', async (req, res) => {
  
    const userID = req.param('user_id');
    const userID2 = req.param('user_id2');
  
    try {
        // Get Friends list of customer
        const getFriendsList = 'SELECT cust_id1 , concat(fname, " ", lname) As Full_Name FROM friends f, users u WHERE cust_id2 = ' + userID + ' AND f.cust_id1  = u.cust_id AND cust_2res = 1 UNION ALL SELECT cust_id2, concat(fname, " ", lname) As Full_Name FROM friends f, users u WHERE cust_id1  = ' + userID + ' AND f.cust_id2 = u.cust_id AND cust_2res = 1;';
        
        // Add Friends 
        //const insertAddFriend = 'INSERT INTO friends (cust_id1, cust_id2) VALUES (' + userID + ', '+ userID2 + ')';
        
        // Friend respons -not complete
        //const getFriendResp = 'UPDATE friends SET Cust_2res = 1 WHERE CustID_1 =  AND CustID_2 = ' + userID + '';
        const testQuery = 'select * from friends;';

            //Run query - fetch response
    //var ReqFriendsList = await pool.query(getReqFriendsList);
    //var FriendResp = await pool.query(getFriendResp);
    //var addFriend = await pool.query(insertAddFriend);
    var testQueryResp = await pool.query(testQuery);
    var friendsList = await pool.query(getFriendsList);


    console.log(userID);

} catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    // [START_EXCLUDE]
    res.status(500).send('Unable to successfully insert transaction!').end();
    // [END_EXCLUDE]
  } 
  // [END cloud_sql_mysql_mysql_connection]

  res.send(JSON.stringify({testQueryResp: testQueryResp, friendsList: friendsList/* userID: userID, ReqFriendsList : ReqFriendsList, AddFriend : AddFriend, FriendResp : FriendResp */})).end();
});

router.post('/friendRequest/:user_id/:user_id2', async (req, res) => {

});

module.exports = router;