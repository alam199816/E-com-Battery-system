const db = require('../db/connect');
// const { v4: uuidv4 } = require('uuid');
exports.checkoutpage = (req, res) => {
    const userId = req.session.userId;
    const purchased = false;
    const selectQuery = `
        SELECT cai.*, det.title, det.price 
        FROM cart_items AS cai 
        JOIN detail AS det ON cai.item_id = det.id 
        WHERE cai.user_id = ? AND cai.purchased = ?
    `;
    console.log(req.session.userId, "sdfdfdssssss");
    db.query(selectQuery, [userId, purchased], (selectError, cartResults) => {
        console.log("checkout data fetched:", cartResults);
        if (selectError) {
            console.error('Error retrieving cart items from MySQL:', selectError);
            return res.status(500).json({ success: false, message: 'Database error', error: selectError });
        }
        res.render('checkout', { checkout: cartResults });
    });
};

// exports.checkoutfun = (req, res) => {
//      const { FirstName, LastName, mobile_no, address_line_1, address_line_2, country, city, state, zip_code } = req.body;

//     console.log('Form Data Received:', req.body);
//         // where id = userId
//     const insertQuery = `
//         INSERT INTO users (FirstName, LastName, mobile_no, address_line_1, address_line_2, country, city, state, zip_code) 
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,)
//      `;
//      const insertValues = [FirstName, LastName, mobile_no, address_line_1, address_line_2, country, city, state, zip_code];

//      db.query(insertQuery, insertValues, (insertError, insertResults) => {
//         if (insertError) {
//             console.error('Error inserting data into MySQL:', insertError);
//             return res.status(500).json({ success: false, message: 'Database error', error: insertError });
//        }
//         console.log('Checkout Data inserted into MySQL with ID', insertResults.insertId);
//         res.redirect('/thank-you');
//      });
// };
exports.checkoutfun = (req, res) => {
    const { FirstName, LastName, mobile_no, address_line_1, address_line_2, country, city, state, zip_code } = req.body;
    const userId = req.session.userId; // Make sure userId is correctly set in the session

    console.log('Form Data Received:', req.body);

    const updateQuery = `
        UPDATE users 
        SET FirstName = ?, LastName = ?, mobile_no = ?, address_line_1 = ?, address_line_2 = ?, country = ?, city = ?, state = ?, zip_code = ? 
        WHERE id = ?
    `;
    const updateValues = [FirstName, LastName, mobile_no, address_line_1, address_line_2, country, city, state, zip_code, userId];

    db.query(updateQuery, updateValues, (updateError, updateResults) => {
        if (updateError) {
            console.error('Error updating data in MySQL:', updateError);
            return res.status(500).json({ success: false, message: 'Database error', error: updateError });
        }
        console.log('Checkout Data updated in MySQL for user ID', userId);

        // Generate a new receipt_id and store it in the session
        const receipt_id = Date.now(); // Generate a UUID as receipt_id
        console.log('Generated receipt_id:', receipt_id);
        req.session.receiptId = receipt_id;

        // Update the purchased field in cart_items table
        const updatePurchasedQuery = `
            UPDATE cart_items 
            SET purchased = 1, receipt_id = ? 
            WHERE user_id = ? AND purchased = 0
        `;
        const updatePurchasedValues = [receipt_id, userId];

        console.log('Update Purchased Values:', updatePurchasedValues);

        db.query(updatePurchasedQuery, updatePurchasedValues, (updatePurchasedError, updatePurchasedResults) => {
            if (updatePurchasedError) {
                console.error('Error updating cart items in MySQL:', updatePurchasedError);
                return res.status(500).json({ success: false, message: 'Database error', error: updatePurchasedError });
            }
            console.log('Purchased items updated in MySQL for user ID', userId);
            res.redirect('/thank-you');
        });
    });
};
