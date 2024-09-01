const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented /register"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let claves = Object.keys(books);
  let booksbyauthor = [];
  for (i=0; i<claves.length; i++)
  {
    let clave = claves[i];
    if (books[clave].author === author){
        booksbyauthor.push(books[clave]);
    }
  }
  res.send(booksbyauthor);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let claves = Object.keys(books);
  let booksbytitle = [];
  for (i=0; i<claves.length; i++)
  {
    let clave = claves[i];
    if (books[clave].title === title){
        booksbytitle.push(books[clave]);
    }
  }
  res.send(booksbytitle);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  res.send("Not implemented");
});

module.exports.general = public_users;
