const productDao = require('../dao/productDao');

async function getProducts() {
    return await productDao.getAllProducts();
}

async function getProduct(id) {
    return await productDao.getProductById(id);
}

async function addProduct(product) {
    return await productDao.addProduct(product);
}

module.exports = {
    getProducts,
    getProduct,
    addProduct
};
