var express = require('express');
var router = express.Router();
var connection = require('./database');
router.get('/', function(req, res, next) {
    res.send('API is working properly');
});

router.get('/tables',function(req, res, next) {
      console.log("hi");
    connection.query(
      "SELECT * FROM user;", 
      function(error, results, fields) {
        if (error) throw error;
        res.json(results);
      }
    );
  });
  router.get('/search',function(req, res, next) {
    console.log("hi");
  connection.query(
    "SELECT * FROM posts;", 
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});
module.exports = router;