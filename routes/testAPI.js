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
    "SELECT tb1.*, user.firstname, user.surname FROM posts tb1 JOIN user tb2 on tb1.seller = tb2.iduser;",
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});
module.exports = router;