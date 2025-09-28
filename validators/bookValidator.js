const { body, validationResult } = require('express-validator');

const bookValidator = {
  createBook: [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('publishedYear').isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Published year must be a valid year'),
  ],
  
  updateBook: [
    body('title').optional().notEmpty().withMessage('Title cannot be empty'),
    body('author').optional().notEmpty().withMessage('Author cannot be empty'),
    body('genre').optional().notEmpty().withMessage('Genre cannot be empty'),
    body('publishedYear').optional().isInt({ min: 1000, max: new Date().getFullYear() }).withMessage('Published year must be a valid year'),
  ],

  validate: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
};

module.exports = bookValidator;