const db = require('../db/connect.js');

const UserLoginControllers = (req, res) => {
  const { EmailAddress, Password } = req.body;

  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE EmailAddress = ? AND Password = ?';
    db.query(query, [EmailAddress, Password], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  })
  .then(data => {
    if (data.length > 0) {
      const userId = data[0].id;
      req.session.userId = userId;
      console.log('userId stored in session',req.session.userId);
      res.redirect('/cart');
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  })
  .catch(error => {
    res.status(500).json({ success: false, message: 'Database query failed', error });
  });
};

module.exports = UserLoginControllers;
