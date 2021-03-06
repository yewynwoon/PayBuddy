'use strict';

const mysql = require('promise-mysql');

let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: "root",
    password: "hello",
    database: "test",
    
    // If connecting via unix domain socket, specify the path
    socketPath: '/cloudsql/paybuddy-2020:australia-southeast1:paybuddy-mysql-db',//${process.env.CLOUD_SQL_CONNECTION_NAME}',
    
    // If connecting via TCP, enter the IP and port instead
    //host: '127.0.0.1',
    //port: 1433,

    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
  });
};
createPool();

var runQuery =  function runQuery(queryString, cb) {
  pool.query(queryString, function (err, res, body) {
    cb(err,res,body); // callback function
  });
}

var serviceObject = {
  "runQuery":runQuery
}

module.exports = serviceObject;