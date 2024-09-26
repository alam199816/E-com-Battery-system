

const db = require('../db/connect.js');

const cartControllers = (req, res) => {
    // Check if user is logged in
    const userId = req.session.userId;
    console.log('userId retrieve in cartssssssssss', userId);
    if (!userId) {
        // If user is not logged in, redirect to login page
        return res.redirect('/login');
    }

    const itemIds = req.session.cart || [];
    console.log('itemsidssss', itemIds);

    if (!itemIds || itemIds.length === 0) {
        console.error('No items in cart session');
        return res.status(400).send('No items in cart');
    }

    const query = 'SELECT * FROM detail WHERE id IN (?)';
    db.query(query, [itemIds], (error, data) => {
        if (error) {
            console.error('error fetching cart info', error);
            res.status(500).send('internal server error in cart');
        } else {
            const carts = data;
            res.render('cart', { carts, isAuthenticated: true });
        }
    });
};



const removeProductFromCart = (req, res) => {
    const productId = req.params.id;
    const userId = req.session.userId;
    const cart = req.session.cart || [];

    // Remove product from session cart
    req.session.cart = cart.filter(id => id != productId);

    // Remove product from database
    const deleteQuery = 'DELETE FROM cart_items WHERE user_id = ? AND item_id = ?';
    db.query(deleteQuery, [userId, productId], (error, result) => {
        if (error) {
            console.error('Error removing product from database', error);
            return res.status(500).json({ success: false, message: 'Error removing product from database' });
        }

        res.json({ success: true });
    });
};
module.exports = {
    cartControllers,
    removeProductFromCart
};



