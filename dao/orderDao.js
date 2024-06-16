const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin@123',
    database: 'pet_products'
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
