import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc Create new Order
// @route POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        itemsPrice,
        shippingPrice,
        totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No Order items')
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems: orderItems.map((x) => ({
                ...x,
                product: x._id,
                _id: undefined
            })),
            shippingAddress,
            paymentMethod,
            taxPrice,
            itemsPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();
        res.status(200).json(createdOrder);
    }

});

// @desc Get my orders
// @route GET /api/orders/mine
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
});

// @desc Get Order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.status(200).json(order);
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
});

// @desc Update Order to Paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentresult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404)
        throw new Error('Order not found')
    }
});

// @desc Update Order to Delivered
// @route GET /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        const updatedOrder = order.save();
        res.status(200).json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }

});

// @desc Get all orders
// @route GET /api/orders/
// @access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name id');
    res.status(200).json(orders);
});

export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
};