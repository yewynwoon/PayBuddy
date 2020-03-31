'use strict';

const express = require('express');
const mysql = require('promise-mysql');

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
// [END cloud_sql_mysql_mysql_create]

var router = express.Router();

// Serve the index page, showing vote tallies.
 router.get('/', async (req, res) => {
  // Get the 5 most recent votes.
  const query = pool.query(
    ''
  );

  // Run queries concurrently, and wait for them to complete
  // This is faster than await-ing each query object as it is created
  const queryResult = await query;

  res.send(queryResult);
}); 

/* router.get('/', function(req, res, next) {
  res.send('API is working properly.. kind of...');
}); */

module.exports = router;