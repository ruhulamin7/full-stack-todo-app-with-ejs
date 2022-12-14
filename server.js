// dependencies
const { response } = require('express');
const express = require('express');
const db = require('./config/db');
const {
  errorhandler,
  notFoundHandler,
} = require('./middlewares/common/errorHandler');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const todoRouter = require('./routes/todoRouter');
const { authChecker } = require('./middlewares/auth/authMiddleware.js');
const indexHandler = require('./controllers/indexController');
const Todo = require('./models/Todo');

// initialization and configuration
const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');

// middleware

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// routers
app.use('/', authRouter);
app.use('/', todoRouter);

app.get('/', authChecker, indexHandler);

// not found handler
app.use(notFoundHandler);

// error handler
app.use(errorhandler);

// server listener
app.listen(PORT, () => {
  db().then(() => {
    console.log('Server is running on http://localhost:' + PORT);
  });
});
