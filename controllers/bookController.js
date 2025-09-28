const BookService = require('../services/bookService');
const Book = require('../models/bookModel');

class BookController {
    constructor() {
        this.bookService = new BookService(Book);
    }

    async getAllBooks(req, res) {
        try {
            const books = await this.bookService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching books', error: error.message });
        }
    }

    async getBookById(req, res) {
        const { id } = req.params;
        try {
            const book = await this.bookService.getBookById(id);
            if (book) {
                res.status(200).json(book);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching book', error: error.message });
        }
    }

    async createBook(req, res) {
        const bookData = req.body;
        try {
            console.log('Creating book with data:', bookData); 
            const newBook = await this.bookService.createBook(bookData);
            res.status(201).json(newBook);
        } catch (error) {
            console.error('Error creating book:', error); 
            res.status(400).json({ message: 'Error creating book', error: error.message });
        }
    }

    async searchBook(req, res) {
        const { q } = req.query;
        try {
            const books = await this.bookService.searchBooks(q);
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error searching books', error: error.message });
        }
    }

    async updateBook(req, res) {
        const { id } = req.params;
        const bookData = req.body;
        try {
            const updatedBook = await this.bookService.updateBook(id, bookData);
            if (updatedBook) {
                res.status(200).json(updatedBook);
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error updating book', error: error.message });
        }
    }

    async deleteBook(req, res) {
        const { id } = req.params;
        try {
            const deletedBook = await this.bookService.deleteBook(id);
            if (deletedBook) {
                res.status(200).json({ message: 'Book deleted successfully' });
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting book', error: error.message });
        }
    }
}

module.exports = BookController;