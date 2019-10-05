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
  router.get('/search', async (req, res)=>{
    console.log("hi");
    let course =  req.query.course;
    let name = req.query.name;
    var conditions ='';
    if(course !== undefined && name !== undefined){
        conditions = 'WHERE tb1.course = ' + course +' AND tb1.book LIKE %' + name +'%';
    }
    else if(course !== undefined && name === undefined){
      conditions = 'WHERE tb1.course = ' + course;
    }
    else if(course === undefined && name !== undefined){
      conditions = 'WHERE tb1.book LIKE %' + name+'%';
    }
    console.log(conditions);
  connection.query(
    `SELECT tb1.*, tb2.firstname, tb2.surname FROM posts tb1 JOIN user tb2 on tb1.seller = tb2.iduser ${conditions};`,
    function(error, results, fields) {
      if (error) throw error;
      res.json(results);
    }
  );
});
module.exports = router;