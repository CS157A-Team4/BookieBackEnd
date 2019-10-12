var express = require('express');
var router = express.Router();
var connection = require('../database');
router.get('/', function(req, res, next) {
    res.send('Post api is working properly');
});
router.get('/:id', async (req, res) =>{
  let id =  req.params.id;
  let queryString = `SELECT * FROM posts WHERE idposts=${id};`;
  connection.query(queryString,
    function(error, results, fields) {
      if (error){
          console.log(error);
      }
      else{
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