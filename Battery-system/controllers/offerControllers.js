const db = require('../db/connect.js');

const offerControllers = () => {
  const query = "SELECT * FROM offers"; // Assuming you have a table named proCat
  console.log("Executing query:", query);

  return new Promise((resolve, reject) => {
    db.query(query, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

module.exports = offerControllers;