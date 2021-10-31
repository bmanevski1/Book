const mongoose = require('mongoose');

const Book = mongoose.model('books', {
  title: String,
  author: String,
});

module.exports = Book;