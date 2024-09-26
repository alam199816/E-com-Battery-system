// const express = require('express');
// const router = express.Router();
// const db = require('../db/connect.js');

// router.post('/', (req, res) => {
//     const { product_id, quantity_input } = req.body;
//     const user_id = req.session.userId; // Ensure user_id is stored in session
//     console.log('user_id retrieved:', user_id);

//     if (!user_id) {
//         // If user is not logged in, redirect to login page
//         return res.redirect('/login');
//     }

//     const purchased = 0; // Initially set purchased to false (0 in MySQL)

//     // Check if the user already has this item in the cart
    
//     db.query(
//         'SELECT * FROM cart_items WHERE user_id = ? AND item_id = ?',
//         [user_id, product_id],
//         (selectError, rows) => {
//             if (selectError) {
//                 console.error('Database operation failed:', selectError);
//                 return res.status(500).send('Server error');
//             }

//             if (rows.length > 0) {
//                 // Item exists, update the quantity
//                 db.query(
//                     'UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND item_id = ?',
//                     [quantity_input, user_id, product_id],
//                     (updateError, result) => {
//                         if (updateError) {
//                             console.error('Database operation failed:', updateError);
//                             return res.status(500).send('Server error');
//                         }
//                         res.redirect('/cart');
//                     }
//                 );
//             } else {
//                 // Item does not exist, insert new item
//                 const insertQuery = 'INSERT INTO cart_items (item_id, quantity, user_id, purchased) VALUES (?, ?, ?, ?)';
//                 db.query(insertQuery, [product_id, quantity_input, user_id, purchased], (insertError, result) => {
//                     if (insertError) {
//                         console.error('Database operation failed:', insertError);
//                         return res.status(500).send('Server error');
//                     }
//                     res.redirect('/cart');
//                 });
//             }
//         }
//     );
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const db = require('../db/connect.js');

router.post('/', (req, res) => {
    const { product_id, quantity_input } = req.body;
    const user_id = req.session.userId; // Ensure user_id is stored in session
    console.log('user_id retrieved:', user_id);

    if (!user_id) {
        // If user is not logged in, redirect to login page
        return res.redirect('/login');
    }

    const purchased = 0; // Initially set purchased to false (0 in MySQL)

    // Check if the user exists
    db.query('SELECT * FROM users WHERE id = ?', [user_id], (userSelectError, userRows) => {
        if (userSelectError) {
            console.error('Database operation failed:', userSelectError);
            return res.status(500).send('Server error');
        }

        if (userRows.length === 0) {
            // User does not exist, insert new user
            const insertUserQuery = 'INSERT INTO users (id) VALUES (?)';
            db.query(insertUserQuery, [user_id], (userInsertError, userResult) => {
                if (userInsertError) {
                    console.error('Database operation failed:', userInsertError);
                    return res.status(500).send('Server error');
                }
                // Proceed to insert/update cart item
                handleCartOperations(user_id, product_id, quantity_input, purchased, res);
            });
        } else {
            // User exists, proceed to insert/update cart item
            handleCartOperations(user_id, product_id, quantity_input, purchased, res);
        }
    });
});

// Function to handle cart operations
function handleCartOperations(user_id, product_id, quantity_input, purchased, res) {
    // Check if the user already has this item in the cart
    db.query(
        'SELECT * FROM cart_items WHERE user_id = ? AND item_id = ?',
        [user_id, product_id],
        (selectError, rows) => {
            if (selectError) {
                console.error('Database operation failed:', selectError);
                return res.status(500).send('Server error');
            }

            if (rows.length > 0) {
                // Item exists, update the quantity
                db.query(
                    'UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND item_id = ?',
                    [quantity_input, user_id, product_id],
                    (updateError, result) => {
                        if (updateError) {
                            console.error('Database operation failed:', updateError);
                            return res.status(500).send('Server error');
                        }
                        res.redirect('/cart');
                    }
                );
            } else {
                // Item does not exist, insert new item
                const insertQuery = 'INSERT INTO cart_items (item_id, quantity, user_id, purchased) VALUES (?, ?, ?, ?)';
                db.query(insertQuery, [product_id, quantity_input, user_id, purchased], (insertError, result) => {
                    if (insertError) {
                        console.error('Database operation failed:', insertError);
                        return res.status(500).send('Server error');
                    }
                    res.redirect('/cart');
                });
            }
        }
    );
}

module.exports = router;
