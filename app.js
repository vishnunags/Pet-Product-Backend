const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to enable CORS
app.use(cors());

// Routes
app.use('/api', productRoutes);
app.use('/api/order', orderRoutes);
const PORT = 80;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
