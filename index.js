require('express-group-routes');
const express = require("express");
const error404 = require('./middleware/err-404')
const booksApiRouter = require("./routes/api/books");
const userRouter = require("./routes/api/user");
const indexRouter = require('./routes/page/index');
const booksPageRouter = require("./routes/page/books");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use('/', indexRouter);
app.use('/books', booksPageRouter);

// app.use(express.json());

app.use('/api/books', booksApiRouter);
app.use('/api/user', userRouter);

app.use(error404)

app.listen(port);