const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',        // Replace with your MySQL username
    password: 'admin@123',        // Replace with your MySQL password
    database: 'pet_products'
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
