const db = require('../db/connect');

const receiptControllers = (req, res) => {
    const userId = req.session.userId;
    const receipt_id = req.session.receiptId;
    const purchased = true;
      // Generate the current date
      const currentDate = new Date();
      const formattedDate = new Intl.DateTimeFormat('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
      }).format(currentDate);

      // Calculate the due date (one week from current date)
      const dueDate = new Date(currentDate);
      dueDate.setDate(dueDate.getDate() + 7);
      const formattedDueDate = new Intl.DateTimeFormat('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
      }).format(dueDate);

    const selectQuery = `
        SELECT cai.*,cai.quantity, det.title, det.price 
        FROM cart_items AS cai 
        JOIN detail AS det ON cai.item_id = det.id 
        WHERE cai.user_id = ? AND cai.purchased = ?
    `;
console.log('ssssssssssssssssss',selectQuery)
    db.query(selectQuery, [userId, purchased], (selectError, receiptItems) => {
        if (selectError) {
            console.error('Error retrieving receipt items from MySQL:', selectError);
            return res.status(500).json({ success: false, message: 'Database error', error: selectError });
        }
    console.log(userId, "adkfjakldfjdssssrrr");
        const userQuery = `SELECT * FROM users where id= ?`;

        db.query(userQuery, [userId], (userError, userDetails) => {
            if (userError) {
                console.error('Error retrieving user details from MySQL:', userError);
                return res.status(500).json({ success: false, message: 'Database error', error: userError });
            }

            if (userDetails.length === 0) {
                return res.status(404).json({ success: false, message: 'User details not found' });
            }

            const sellerQuery = `SELECT * FROM sellers`;

            db.query(sellerQuery, (sellerError, sellerDetails) => {
                if (sellerError) {
                    console.error('Error retrieving seller details from MySQL:', sellerError);
                    return res.status(500).json({ success: false, message: 'Database error', error: sellerError });
                }

                if (sellerDetails.length === 0) {
                    return res.status(404).json({ success: false, message: 'Seller details not found' });
                }
         
            res.render('receipt', { receiptItems, seller: sellerDetails[0], formattedDueDate, formattedDate, receipt_id, userDetails: userDetails[0] });
            console.log('receiptItems', receiptItems);
            console.log('userDetails', userDetails);
        });
    });
    });
};

module.exports = receiptControllers;
