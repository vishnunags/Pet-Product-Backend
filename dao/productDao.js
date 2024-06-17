const mysql = require('mysql2/promise');
require('dotenv').config();

console.log('process.env.HOST', process.env.HOST);

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,        // Replace with your MySQL username
    password: process.env.PASSWORD,        // Replace with your MySQL password
    database: process.env.DATABASE
});

async function getAllProducts() {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
}

async function getProductById(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
}

async function addProduct(product) {
    const { name, price, description, image_url } = product;
    const [result] = await pool.query('INSERT INTO products (name, price, description, image_url) VALUES (?, ?, ?, ?)', [name, price, description, image_url]);
    const newProductId = result.insertId;
    const newProduct = await getProductById(newProductId);  // Fetch newly added product
    return newProduct;
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct
};
