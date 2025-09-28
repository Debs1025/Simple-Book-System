const express = require('express');
const BookController = require('../controllers/bookController');

const router = express.Router();
const bookController = new BookController();

//Book routes
router.get('/', bookController.getAllBooks.bind(bookController));
router.get('/:id', bookController.getBookById.bind(bookController));
router.post('/', bookController.createBook.bind(bookController));
router.get('/search', bookController.searchBook.bind(bookController));
router.put('/:id', bookController.updateBook.bind(bookController));
router.delete('/:id', bookController.deleteBook.bind(bookController));

module.exports = router;