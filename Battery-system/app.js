const express = require("express");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables at the very beginning
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const sessionStore = new MySQLStore(options);
app.use(session({
  secret: 'k.alam', 
  resave: false,
  store: sessionStore,
  saveUninitialized: true,
  // cookie: { secure: false } 
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } 
}));

const port = process.env.PORT || 1700;

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const receipt = require('./routes/receipt');
const index = require('./routes/index');
const admin = require('./routes/admin');
const addToCartRouter = require('./routes/add_to_cart');

app.use('/add_to_cart', addToCartRouter);
app.use('/',receipt);
app.use('/', index);
app.use('/cart', index);
app.use('/checkout', index);
app.use('/contact', index);
app.use('/detail', index);
app.use('/shop', index);
app.use('/login', index);
app.use('/logout', index);
app.use('/register', index);
app.use('/admin', admin);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
