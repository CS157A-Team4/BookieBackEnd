
require('dotenv').config()
const https = require('https')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./api/routes/database');
const testAPIRouter = require('./auth.js');
const cors = require('cors');
app.route('/tables')
  .get(function(req, res, next) {
      console.log("hi");
    connection.query(
      "SELECT * FROM user;", 
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });

  
  // Port 8080 for Google App Engine
  app.set('port', process.env.PORT || 8090);
  app.listen(8090);
  