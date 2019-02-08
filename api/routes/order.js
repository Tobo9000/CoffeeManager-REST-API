const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/order');

router.get('/', OrderController.order_get_all);

router.post('/addOrder', OrderController.order_post_add);

router.delete('/deleteItem/:id', OrderController.order_delete_by_id);

router.post('/changeOrder', OrderController.order_post_change);

module.exports = router;