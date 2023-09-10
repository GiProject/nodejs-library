const router = require("express").Router();
const { Book } = require("../../models/Book");
const store = require("../../store");
const fileMiddleware = require("../../middleware/file");
const path = require("path");

router.get('/', (req, res) => {
    const {books} = store;
    
    res.status(200);
    res.json(books);
    res.end();
});

router.get('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const bookIndex = books.findIndex(el => el.id === id);

    if (bookIndex !== -1) {
        res.json(books[bookIndex]);
    } else {
        res.status(404);
        res.json('not found');
    }
    res.end();
});

router.get('/:id/download', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const bookIndex = books.findIndex(el => el.id === id);

    if (books[bookIndex]) {
		res.download(path.join(__dirname, "../..", books[bookIndex].fileBook), (err) => {
			if (err) {
				res.status(404)
                res.json({result: "not found"});
			}
		});
	} else {
		res.status(404);
        res.json({result: "not found"});
	}
});

router.post('/',  fileMiddleware.single("fileBook"), (req, res) => {
    const {books} = store;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const {file} = req;
    let fileBook = '';

    if (file) {
        fileBook = file.path 
    }

    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
    res.end();
});

router.put('/:id',  fileMiddleware.single("fileBook"), (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const {title, description, authors, favorite, fileCover, fileName} = req.body;
    const bookIndex = books.findIndex(el => el.id === id);

    const {file} = req;
    let fileBook = '';

    if (file) {
        fileBook = file.path 
    }

    if (bookIndex !== -1) {
        books[bookIndex] = {...books[bookIndex],title, description, authors, favorite, fileCover, fileName, fileBook}

        res.status(200);
        res.json(books[bookIndex]);
    } else {
        res.status(404);
        res.json('not found');
    }
    res.end();
});

router.delete('/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const bookIndex = books.findIndex(el => el.id === id);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1)

        res.status(200);
        res.json('ok');
    } else {
        res.status(404);
        res.json('not found');
    }
    res.end();
});

module.exports = router;