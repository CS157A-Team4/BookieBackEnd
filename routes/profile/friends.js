var express = require('express');
var router = express.Router();
var connection = require('./database');
router.get('/', function(req, res, next) {
    res.send('Friends API is working properly');
});

router.get('/list/:id', async (req, res) =>{
    let id =  req.params.id;
    let queryString = `SELECT user1 FROM FriendsListAndRequest WHERE user2 = ${id} UNION ALL SELECT user2 FROM FriendsListAndRequest WHERE user1 =${id};`
    connection.query(queryString,
        function(error, results, fields) {
          if (error){
              console.log(error);
          }
          else{
            console.log(results[0]);
    
          res.json(results)};
        }
      );
});