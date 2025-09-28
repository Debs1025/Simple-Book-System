class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }

    async getAllBooks(req, res) {
        try {
            const books = await this.bookService.getAllBooks();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching books', error });
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
            res.status(500).json({ message: 'Error fetching book', error });
        }
    }

    async createBook(req, res) {
        const bookData = req.body;
        try {
            const newBook = await this.bookService.createBook(bookData);
            res.status(201).json(newBook);
        } catch (error) {
            res.status(400).json({ message: 'Error creating book', error });
        }
    }

    async searchBook(req, res) {
        const { query } = req.query;
        try {
            const books = await this.bookService.searchBook(query);
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Error searching books', error });
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
            res.status(400).json({ message: 'Error updating book', error });
        }
    }

    async deleteBook(req, res) {
        const { id } = req.params;
        try {
            const deletedBook = await this.bookService.deleteBook(id);
            if (deletedBook) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Book not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting book', error });
        }
    }
}

module.exports = BookController;