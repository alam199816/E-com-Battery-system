const db = require('../db/connect.js');

const contactUs = (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(req.body, 'eid');
    const query = 'INSERT INTO contactUs (name, email, subject, message) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }

        console.log('Data inserted into MySQL with ID', result.insertId);
        res.redirect('/');
    });
};

module.exports = contactUs;
