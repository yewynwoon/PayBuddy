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
  var query = 'select merchant_app_id, merchant_id, name, return_url from merchant_apps where merchant_id="' + merchID + '";';

  try {

    var merchApps = await pool.query(query);
    res.status(200).send({message: merchApps}).end();

  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});

//Get merchant app
router.get('/app/:app_id', async (req, res) => {
  var appID = req.params.app_id;
  var query = 'selectname, return_url from merchant_apps where merchant_app_id="' + appID + '";';

  try {

    var merchApp = await pool.query(query);
    res.status(200).send({message: merchApp}).end();

  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
  
});

router.post('/:appId/update', async (req, res) => {
  var appID = req.params.app_id;

  try {
    const updateProjectQuery = 'UPDATE merchant_apps SET title=(?), return_url=(?) WHERE project_id=(?)';

    await pool.query(updateProjectQuery, [req.body.title, req.body.return_url, appID]);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});

router.get('/deleteApp/:appID', async (req, res) => {
  const appID = req.params.appID;

  try {
    //Get current acct_value of customer
    const getProjectsQuery = 'delete from merchant_apps where merchant_app_id=(?);';

    //Run query - fetch response
    await pool.query(getProjectsQuery, [appID]);

    //console.log(projectList);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
      console.log(err);
      res.status(500).end('Unable to retrieve projecs!');
  }
});

router.post('/new', async (req, res) => {

  console.log(req.body.merchant_id, req.body.name, req.body.return_url);

  try {
    const updateProjectQuery = 'insert into merchant_apps (merchant_id, name, return_url) values (?, ?, ?)';

    await pool.query(updateProjectQuery, [req.body.merchant_id, req.body.name, req.body.return_url]);

    res.status(200).end(JSON.stringify({response: 'Succesful!'}));
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});

router.get('/:merch_id', async (req, res) => {
  var merch_id = req.params.merch_id;

  try {
     
    //Get current acct_value of customer
    const getAcctValueQuery = 'select account_value from merchants where merchant_id = ' + merch_id + ';';

    //Get past deposits of customer
    const getPastDepositQuery = 'select amount, date_stamp, description from cust_merchant_payment where merchant_id=' + merch_id + ';';
    
    //Run query - fetch response
    var acctValue = await pool.query(getAcctValueQuery);
    var transacts = await pool.query(getPastDepositQuery);

    function compare(a, b) {

      const bandA = a.date_stamp;
      const bandB = b.date_stamp;

      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison * -1;
    }
    
    transacts.sort(compare);

    var lastTenTransacts = transacts.slice(0,13);

    res.end(JSON.stringify({acctValue: acctValue, transactions: lastTenTransacts}));
    
  } catch (err) {
    console.log(err);
    res.status(500).end('Unable to successfully insert transaction!');
  }
});


module.exports = router;