const router = require("express").Router();
const { Book } = require("../../models/Book");
const store = require("../../store");
const fileMiddleware = require("../../middleware/file");
const path = require("path");

router.get("/", (_req, res) => {
    const {books} = store;
	res.render("books/list", { title: "Книги", books: books });
});

router.get("/create", (_req, res) => {
	res.render("books/create", { title: "Добавление книги", book: {} });
});

router.post("/create", fileMiddleware.single("fileBook"), (req, res) => {
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
    res.redirect("/books/");
});

router.get("/update/:id", (req, res) => {
	const { id } = req.params;
    const {books} = store;
	let book = books.find((b) => b.id === id);

	if (book) {
		res.render("books/update", {
			title: "Редактирование книги",
			book: book,
		});
	} else {
		res.status(404).redirect("/404");
	}
});

router.post("/update/:id", fileMiddleware.single("fileBook"), (req, res) => {
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

        res.redirect("/books/view/" + id);
    } else {
        res.status(404).redirect("/404");
    }

});

router.get("/view", (_req, res) => {
	res.render("books/view", { title: "Книги", books: books });
});

router.get("/view/:id", (req, res) => {
    const { books } = store;
	const { id } = req.params;
	const book = books.find((b) => b.id === id);

    console.log(book);

	if (book) {
		res.render("books/view", { title: "Просмотр книги", book: book });
	} else {
		res.status(404).redirect("/404");
	}
});

router.post("/delete/:id", (req, res) => {
	const { id } = req.params;
    const { books } = store;
	const index = books.findIndex((b) => b.id === id);

	if (index !== -1) {
		books.splice(index, 1);
		res.status(200).redirect("/books/");
	} else {
		res.status(404).redirect("/404");
	}
});

module.exports = router;