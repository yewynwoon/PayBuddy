// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');
const mysql = require('promise-mysql');

// [START cloud_sql_mysql_mysql_create]
let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: "root", //process.env.DB_USER, // e.g. 'my-db-user'
    password: "hello", //process.env.DB_PASS, // e.g. 'my-db-password'
    database: "test", //process.env.DB_NAME, // e.g. 'my-database'
    // If connecting via unix domain socket, specify the path
    //socketPath: '/cloudsql/paybuddy-jeremy:australia-southeast1:paybuddy-mysql-db',//${process.env.CLOUD_SQL_CONNECTION_NAME}',
    // If connecting via TCP, enter the IP and port instead
    host: '127.0.0.1',
    port: 1433,

    //[START_EXCLUDE]

    // [START cloud_sql_mysql_mysql_limit]
    // 'connectionLimit' is the maximum number of connections the pool is allowed
    // to keep at once.
    connectionLimit: 5,
    // [END cloud_sql_mysql_mysql_limit]

    // [START cloud_sql_mysql_mysql_timeout]
    // 'connectTimeout' is the maximum number of milliseconds before a timeout
    // occurs during the initial connection to the database.
    connectTimeout: 10000, // 10 seconds
    // 'acquireTimeout' is the maximum number of milliseconds to wait when
    // checking out a connection from the pool before a timeout error occurs.
    acquireTimeout: 10000, // 10 seconds
    // 'waitForConnections' determines the pool's action when no connections are
    // free. If true, the request will queued and a connection will be presented
    // when ready. If false, the pool will call back with an error.
    waitForConnections: true, // Default: true
    // 'queueLimit' is the maximum number of requests for connections the pool
    // will queue at once before returning an error. If 0, there is no limit.
    queueLimit: 0, // Default: 0
    // [END cloud_sql_mysql_mysql_timeout]

    // [START cloud_sql_mysql_mysql_backoff]
    // The mysql module automatically uses exponential delays between failed
    // connection attempts.
    // [END cloud_sql_mysql_mysql_backoff]

    //[END_EXCLUDE]
  });
};
createPool();
// [END cloud_sql_mysql_mysql_create]

var router = express.Router();

// Serve the index page, showing vote tallies.
 router.get('/', async (req, res) => {
  // Get the 5 most recent votes.
  const recentVotesQuery = pool.query(
    'SELECT * FROM users'
  );

  // Run queries concurrently, and wait for them to complete
  // This is faster than await-ing each query object as it is created
  const recentVotes = await recentVotesQuery;

  res.send(recentVotes);
}); 

/* router.get('/', function(req, res, next) {
  res.send('API is working properly.. kind of...');
}); */

module.exports = router;