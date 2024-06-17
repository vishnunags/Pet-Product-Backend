const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,        // Replace with your MySQL username
    password: process.env.PASSWORD,        // Replace with your MySQL password
    database: process.env.DATABASE
});

async function createOrder(order) {
    const { totalAmount, items } = order;
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();
        
        const [orderResult] = await connection.query(
            'INSERT INTO orders (total_amount, status) VALUES (?, ?)',
            [totalAmount, 'Pending']
        );
        const orderId = orderResult.insertId;

        for (const item of items) {
            const { productId, quantity, price } = item;
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                [orderId, productId, quantity, price]
            );
        }

        await connection.commit();
        return { orderId, ...order };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    createOrder
};
