class BookService {
    constructor(BookModel) {
        this.BookModel = BookModel;
    }

    async getAllBooks() {
        return await this.BookModel.find();
    }

    async getBookById(id) {
        return await this.BookModel.findById(id);
    }

    async createBook(bookData) {
        const book = new this.BookModel(bookData);
        return await book.save();
    }

    async searchBooks(query) {
        return await this.BookModel.find({ title: { $regex: query, $options: 'i' } });
    }

    async updateBook(id, bookData) {
        return await this.BookModel.findByIdAndUpdate(id, bookData, { new: true });
    }

    async deleteBook(id) {
        return await this.BookModel.findByIdAndDelete(id);
    }
}

module.exports = BookService;