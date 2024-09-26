const db = require('../db/connect.js');

const slideControllers = () => {
  const query = "SELECT * FROM slider";
  console.log("Executing query:", query);

  return new Promise((resolve, reject) => {
    db.query(query, (err, data) => {
      if (err) {
        console.error("Error fetching slides:", err);
        reject(err);
      } else {
        console.log("Slides data fetched:", data);
        resolve(data);
      }
    });
  });
};

module.exports = slideControllers;
