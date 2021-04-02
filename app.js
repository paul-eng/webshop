
const express = require('express');
const connectDB = require('./config/db');
const products = require('./routes/api/products');

const app = express();
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/products', products);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
