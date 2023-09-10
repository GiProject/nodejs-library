require('express-group-routes');
const express = require("express");
const error404 = require('./middleware/err-404')
const booksRouter = require("./routes/api/books");
const userRouter = require("./routes/api/user");

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/books', booksRouter);
app.use('/api/user', userRouter);

app.use(error404)

app.listen(port);