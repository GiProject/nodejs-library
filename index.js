require('express-group-routes');
const express = require("express");
const { Book } = require("./models/Book");

const app = express();
const port = 3000;

app.use(express.json());

const store = {
    books: []
}

app.group('/api', router => {
    router.group('/user', router => {
        router.post('/login', (req, res) => {
            res.status(200);
            res.json({
                id: 1,
                mail: 'test@mail.ru'
            })
            res.end();
        });
    })

    router.group('/books', router => {
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
        
        router.post('/', (req, res) => {
            const {books} = store;
            const {title, description, authors, favorite, fileCover, fileName} = req.body;
        
            const newBook = new Book(title, description, authors, favorite, fileCover, fileName);
            books.push(newBook);
        
            res.status(201);
            res.json(newBook);
            res.end();
        });
        
        router.put('/:id', (req, res) => {
            const {books} = store;
            const {id} = req.params;
            const {title, description, authors, favorite, fileCover, fileName} = req.body;
            const bookIndex = books.findIndex(el => el.id === id);
        
            if (bookIndex !== -1) {
                books[bookIndex] = {...books[bookIndex],title, description, authors, favorite, fileCover, fileName}
        
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
    });
});

app.listen(port);