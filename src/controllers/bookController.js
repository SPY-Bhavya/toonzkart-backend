// controllers/bookController.js
const Book = require('../models/bookModel');

// Create a new book (Admin only)
exports.addBook = async (req, res) => {
  try {
    const { title, author, description, isbn, price, stock, subject, image } = req.body;

    // Ensure required fields are present
    if (!title || !author || !isbn || !price || !subject) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const book = new Book({
      title,
      author,
      description,
      isbn,
      price,
      stock: stock || 0,
      subject,
      image,
    });

    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// GET books by school
exports.getBooksBySchool = async (req, res) => {
  try {
    const { schoolName } = req.params;
    const books = await Book.find({ school: schoolName });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// GET books by subject
exports.getBooksBySubject = async (req, res) => {
  try {
    const { subjectName } = req.params;
    const books = await Book.find({ subject: subjectName });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// GET a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// GET all books or handle search queries
exports.getAllBooks = async (req, res) => {
  try {
    // Example: handle query ?search=keyword
    const searchTerm = req.query.search;
    let query = {};
    if (searchTerm) {
      query = { 
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { author: { $regex: searchTerm, $options: 'i' } }
        ]
      };
    }
    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
