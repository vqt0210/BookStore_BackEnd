const express = require('express');
const Book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, UpdateBook, deleteABook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router();

/**
 * @swagger
 * /api/books/create-book:
 *   post:
 *     summary: Create a new book
 *     description: Admin can create a new book by providing the book details.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized, Admin token required
 */
router.post("/create-book", verifyAdminToken, postABook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     description: Retrieves a list of all books in the database.
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 */
router.get("/", getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a single book by ID
 *     description: Retrieve details of a specific book using its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 price:
 *                   type: number
 *                 description:
 *                   type: string
 *       404:
 *         description: Book not found
 */
router.get("/:id", getSingleBook);

/**
 * @swagger
 * /api/books/edit/{id}:
 *   put:
 *     summary: Update a book by ID
 *     description: Allows admins to update details of an existing book by ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized, Admin token required
 *       404:
 *         description: Book not found
 */
router.put("/edit/:id", verifyAdminToken, UpdateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Allows admins to delete a book from the database by its ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       401:
 *         description: Unauthorized, Admin token required
 *       404:
 *         description: Book not found
 */
router.delete("/:id", verifyAdminToken, deleteABook);

module.exports = router;
