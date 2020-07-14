const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();


// import routes
const userRoutes = require('./routes/user');
const portfolioRoutes = require('./routes/portfolio');
const messageRoutes = require('./routes/message');
// app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then(() => console.log('DATABASE Connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes middleware
app.use('/api', userRoutes);
app.use('/api', portfolioRoutes);
app.use('/api', messageRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
