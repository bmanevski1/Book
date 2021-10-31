const Book = require('../models/Book');

const getAllBooks = async (req, res, next) => {
  try {
    const allBooks = await Book.find();
    return res.status(200).json(allBooks);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};




module.exports = {
    getAllBooks,
    
    
  };