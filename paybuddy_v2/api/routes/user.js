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
  var userID = req.params.user_id;
  var query = 'select account_value from users where cust_id=' + userID + ';';

  sql.runQuery(query, function(err,response,data) {
      if(!err) {
          console.log(response)
          res.send(response);
      }
  });
});

module.exports = router;