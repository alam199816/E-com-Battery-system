const db = require('../db/connect.js');

const UserRegControllers = (req, res) => {
    console.log(req.body, 'Form Data Received');
    const {FirstName, LastName, EmailAddress, mobile_no, address_line_1, address_line_2, country, city, state, zip_code, Password, RepeatPassword } = req.body;

    const query = 'INSERT INTO users (FirstName, LastName, EmailAddress, mobile_no, address_line_1, address_line_2, country, city, state, zip_code, Password, RepeatPassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [
        FirstName, LastName, EmailAddress, mobile_no, address_line_1, address_line_2,
        country, city, state, zip_code, Password, RepeatPassword
    ], (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }

        console.log('Data inserted into MySQL with ID', result.insertId);
        req.session.firstName = FirstName + ' ' + LastName;
        console.log('stored into session', req.session.firstName);
        res.redirect('/login');
    });
};

module.exports = UserRegControllers;
