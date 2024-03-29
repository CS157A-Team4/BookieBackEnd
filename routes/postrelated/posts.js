var express = require('express');
var router = express.Router();
var connection = require('../database');
router.get('/', function(req, res, next) {
    res.send('Post api is working properly');
});
router.get('/:id', async (req, res) =>{
  let id =  req.params.id;
  let queryString = `SELECT tb1.*, tb2.firstname, tb2.surname,tb3.image FROM Post tb1 JOIN user tb2 on tb1.seller = tb2.iduser JOIN PostImage tb3 ON tb3.imageID = tb1.imageId WHERE tb1.postID=${id};`;
  let commentString= `SELECT tb1.*, tb2.firstname, tb2.surname FROM comments tb1 JOIN user tb2 on tb1.poster= tb2.iduser WHERE tb1.postID=${id};`;
  let saveString = `SELECT userID FROM SavedPost;`
  connection.query(queryString+commentString+saveString,
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
router.post('/edit', async function(req, res) {
  console.log("okay im here");
  author = req.body.author;
  bookname = req.body.bookname;
  condition = req.body.condition;
  course = req.body.course;
  description = req.body.description;
  image = req.body.image;
  price = req.body.price;
  poster = req.body.poster;
  today = req.body.date;
  id = req.body.id;
  imageId = req.body.imageId;
  console.log(imageId);
  imageString = `UPDATE PostImage SET \`Image\` = "${image}" WHERE \`imageID\`=${imageId}`;
  console.log(imageString);
  connection.query(
      imageString,
      function(error, results, fields) {
        if (error){
            console.log(error);
        }
        else{
        queryString = `UPDATE Post SET \`title\` = "${bookname}", \`author\`="${author}", \`course\`="${course}", \`condition\`="${condition}", \`body\`="${description}", \`imageId\`="${imageId}", \`price\`=${price}, \`seller\`="${poster}", \`date\`="${today}" WHERE \`postID\`=${id};`;
        console.log(queryString);
        connection.query(
          queryString,
          function(error, results, fields) {
            if (error){
                console.log(error);
            }
            else{res.json(results)}
      })
    }
  }
    );
  });
router.post('/create', async function(req, res) {
    console.log("okay im here");
    author = req.body.author;
    bookname = req.body.bookname;
    condition = req.body.condition;
    course = req.body.course;
    description = req.body.description;
    image = req.body.image;
    price = req.body.price;
    poster = req.body.poster;
    today = req.body.date;
    imageString = `INSERT INTO PostImage (\`postId\`, \`Image\`) VALUES(0,"${image}");`;
    imageIdGetString = `SELECT LAST_INSERT_ID();`;
    connection.query(
        imageString,
        function(error, results, fields) {
          if (error){
              console.log(error);
          }
          else{
          let imageId = results.insertId;
          queryString = `INSERT INTO Post (\`title\`,\`author\`,\`course\`,\`condition\`,\`body\`,\`imageId\`,\`price\`, \`seller\`,\`date\`) \
    values("${bookname}","${author}", "${course}","${condition}","${description}","${imageId}",${price},"${poster}","${today}");`;
          connection.query(
            queryString,
            function(error, results, fields) {
              if (error){
                  console.log(error);
              }
              else{res.json(results)}
        })
      }
    }
      );
    });

    router.post('/createComment', async function(req, res) {
      commentor = req.body.commentor;
      when = req.body.when;
      content = req.body.content;
      postid = req.body.postid;
      queryString = `INSERT INTO comments (\`poster\`,\`content\`,\`postid\`,\`when\`) \
      values("${commentor}","${content}","${postid}","${when}");`;
      connection.query(
        queryString,
        function(error, results, fields) {
          if (error){
            console.log("ERROR");
            return res.status(400).json({
              error: true,
              message: "Error inserting the comment",
              eMessage: error
            }); 
          }
          else{
            let commentString= `SELECT tb1.*, tb2.firstname, tb2.surname FROM comments tb1 JOIN user tb2 on tb1.poster= tb2.iduser WHERE tb1.postid=${postid};`;
            connection.query(
              commentString,
              function(error, results, fields) {
                if (error){
                  console.log("ERROR");
                  return res.status(400).json({
                    error: true,
                    message: "Error returning the comment"
                  }); 
                }
                else{
                  console.log(results);
                res.json(results)
                }});
          };
        }
      );
    });
module.exports = router;