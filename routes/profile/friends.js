var express = require('express');
var router = express.Router();
var connection = require('../database');
router.get('/', function(req, res, next) {
    res.send('Friends API is working properly');
});

router.get('/list/:id', async (req, res) =>{
    let id =  req.params.id;
    let queryString = `select f1.* from FriendsListAndRequest f1 inner join FriendsListAndRequest f2 on f1.user1 = f2.user2 and f1.user1 = f2.user2;`
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
module.exports = router;