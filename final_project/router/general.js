const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {

  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password){
    return res.status(404).json({message:"Unable to register user."});
  }

  if(isValid(username)){
    return res.status(404).json({message:"User already exists!"});
  }

  users.push({
    username: username,
    password: password
  });

  return res.status(200).json({
    message:"User successfully registered. Now you can login"
  });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn]);
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  const author = req.params.author;

  const filteredBooks = Object.keys(books)
    .filter(key => books[key].author === author)
    .reduce((obj,key)=>{
      obj[key] = books[key];
      return obj;
    },{});

  return res.status(200).json(filteredBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

  const title = req.params.title;

  const filteredBooks = Object.keys(books)
    .filter(key => books[key].title === title)
    .reduce((obj,key)=>{
      obj[key] = books[key];
      return obj;
    },{});

  return res.status(200).json(filteredBooks);
});

// Get book review
public_users.get('/review/:isbn',function (req, res) {

  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn].reviews);
});

module.exports.general = public_users;