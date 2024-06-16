const orderDao = require('../dao/orderDao');

async function createOrder(order) {
    return await orderDao.createOrder(order);
}

module.exports = {
    createOrder
};
