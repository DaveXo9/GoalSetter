const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDb = require('./config/db');

connectDb();

const CONNECTION_URL = process.env.CONNECTION_URL;
const port = process.env.PORT || 5000; 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);
app.listen(port, () => console.log(`Server running on port ${port}`));
