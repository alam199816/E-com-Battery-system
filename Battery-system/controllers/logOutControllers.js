const db = require('../db/connect.js');

const logOutControllers = (req, res) => {
    console.log('logging out...');
    req.session.destroy(function(err) {
        if (err) {
            console.error('error destroying session', err);
            res.status(500).send('internal server error in logging out');
        } else {
            console.log('session destroyed successfully');
            res.redirect('/login');
        }
    });
};

module.exports = logOutControllers;
