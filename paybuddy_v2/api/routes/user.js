'use strict';

var sql = require('./api/sql.js');

const express = require('express');
const bodyParser = require('body-parser');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

//Get user account balance
router.get('/acctBalance/:user_id', async (req, res) => {
  try {
    var userID = req.params.user_id;

    console.log(userID);

    var userAcctBalance = sql('select account_value from users where cust_id=' + userID + ';');

    console.log(userAcctBalance);
  
    if (userAcctBalance == null) {
      res.status(500).send('Unable to validate billerCode').end();
    } else {
      res.status(200).send(userAcctBalance).end();
    }
  } catch {
    res.status(500).send('Unable to validate billerCode').end();
  }
});

module.exports = router;