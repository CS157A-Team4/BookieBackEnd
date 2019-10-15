var express = require('express');
var router = express.Router();
var connection = require('../database');
router.get('/', function(req, res, next) {
    res.send('Post api is working properly');
});
router.get('/:id', async (req, res) =>{
  let id =  req.params.id;
  let queryString = `SELECT tb1.*, tb2.firstname, tb2.surname FROM posts tb1 JOIN user tb2 on tb1.seller = tb2.iduser WHERE idposts=${id};`;
  let commentString= `SELECT tb1.*, tb2.firstname, tb2.surname FROM comments tb1 JOIN user tb2 on tb1.postid= tb2.iduser WHERE tb1.postid=${id};`;
  connection.query(queryString+commentString,
    function(error, results, fields) {
      if (error){
          console.log(error);
      }
      else{
        console.log(results[0]);
        console.log(results[1]);

      res.json(results)};
    }
  );
});
router.post('/create', async function(req, res) {
    console.log("okay im here");
    author = req.body.author
    bookname = req.body.bookname
    condition = req.body.condition
    course = req.body.course
    description = req.body.description
    image = req.body.image
    price = req.body.price
    poster = req.body.poster;
    today = req.body.date;
    queryString = `INSERT INTO posts (\`book\`,\`author\`,\`course\`,\`condition\`,\`body\`,\`image\`,\`price\`, \`seller\`,\`date\`) \
    values("${bookname}","${author}", "${course}","${condition}","${description}","${image}",${price},"${poster}","${today}");`;
    console.log(queryString);
    connection.query(
        queryString,
        function(error, results, fields) {
          if (error){
              console.log(error);
          }
          else{
          res.json(results)};
        }
      );
    });
module.exports = router;