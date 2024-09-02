const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      let allbooks = JSON.stringify(books,null,4);
      resolve(allbooks);
    },6000)})

var task11_function = function(isbn_code){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
          let onebook = books[isbn_code];
          resolve(onebook);
        },6000)})
};

var task12_function = function(author_code){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            let claves = Object.keys(books);
            let booksbyauthor = [];
            for (i=0; i<claves.length; i++)
            {
              let clave = claves[i];
              if (books[clave].author === author_code){
                 booksbyauthor.push(books[clave]);
              }
           }
          resolve(booksbyauthor);
        },6000)})
};

var task13_function = function(title_code){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            let claves = Object.keys(books);
            let booksbytitle = [];
            for (i=0; i<claves.length; i++)
            {
              let clave = claves[i];
              if (books[clave].title === title_code){
                booksbytitle.push(books[clave]);
              }
            }

          resolve(booksbytitle);
        },6000)})
};

public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented /register"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //res.send(JSON.stringify(books,null,4));
  myPromise.then((successMessage) => {
    res.send(successMessage);
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  //res.send(books[isbn]);
  task11_function(isbn).then((message) => res.send(message));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  /*let claves = Object.keys(books);
  let booksbyauthor = [];
  for (i=0; i<claves.length; i++)
  {
    let clave = claves[i];
    if (books[clave].author === author){
        booksbyauthor.push(books[clave]);
    }
  }
  res.send(booksbyauthor);*/
  task12_function(author).then((message) => res.send(message));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  /*let claves = Object.keys(books);
  let booksbytitle = [];
  for (i=0; i<claves.length; i++)
  {
    let clave = claves[i];
    if (books[clave].title === title){
        booksbytitle.push(books[clave]);
    }
  }
  res.send(booksbytitle);*/
  task13_function(title).then((message) => res.send(message));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  res.send("Not implemented");
});

module.exports.general = public_users;
