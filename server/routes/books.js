// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, showbook) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: showbook
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/details', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     book.find( (err, showbooks) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('books/details', {
          title: 'Books',
          books: showbooks
        });
      }
    });
  
  });

// POST process the Book Details page and create a new Book - CREATE
router.post('/details', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
      let id = req.params.id;
      const {Title, Price, Author, Genre, Description} = req.body;
    
      const newBook = new book({
        Title,
        Price,
        Author,
        Genre,
        Description
      });
      book.create(newBook, (err, book) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          res.redirect("/books");
        }
      });
    });
    

// GET the Book Details page in order to edit an existing Book
router.get('/details/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     book.findById(id, (err, editbooks) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             res.render('books/edit', {
                 title: "Books",
                 books: editbooks
             })  
         }
     })

});

// POST - process the information passed from the details form and update the document
router.post('/details/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

     let id = req.params.id;
     const {Title, Price, Author, Genre, Description} = req.body;
     const editBook = new book({
      _id: id,
      Title,
      Price,
      Author,
      Genre,
      Description,
    });
 
     book.updateOne({_id: id}, editBook, (err) => {
         if(err) {
             console.log(err);
             res.end(err);
         }
         else
         {
             res.redirect('/books');
         }
     });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

     let id = req.params.id;

     book.remove({_id: id}, (err) => {
         if(err)
         {
             console.log(err);
             res.end(err);
         }
         else
         {
             res.redirect('/books');
         }
     });
});


module.exports = router;
