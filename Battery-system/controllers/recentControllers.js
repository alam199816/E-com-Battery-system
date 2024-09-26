
const db = require('../db/connect.js');

const recentControllers = () => {
  const query = "SELECT * FROM recent_pro"; 
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

module.exports = recentControllers;
