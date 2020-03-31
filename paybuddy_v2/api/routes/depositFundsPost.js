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
  
  /* const query = pool.query(
    'select * from users;'
  );

  // Run queries concurrently, and wait for them to complete
  // This is faster than await-ing each query object as it is created
  const queryResult = await query;

  res.send(queryResult); */  
});

router.post('/', async (req, res) => {
  
  // [START cloud_sql_mysql_mysql_connection]
  try {
    req.body.value
    const stmt = `insert into cust_transfer (src_cust_id, dest_cust_id, amount, description) values (3, 1, ${500}, 'test3');`;
    
    // Pool.query automatically checks out, uses, and releases a connection
    // back into the pool, ensuring it is always returned successfully.
    await pool.query(stmt);
  } catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    // [START_EXCLUDE]
    logger.err(err);
    res.status(500).send(
      'Unable to successfully insert transaction!'
    ).end();
    // [END_EXCLUDE]
  }
  // [END cloud_sql_mysql_mysql_connection]

  res.status(200).send(`req.body.value`).end();
});

module.exports = router;