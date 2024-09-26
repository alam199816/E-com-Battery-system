const db = require('../db/connect.js');

const sliderOfferControllers = () => {
  const query = "SELECT * FROM slider_offer";
  console.log("Executing query:", query);

  return new Promise((resolve, reject) => {
    db.query(query, (err, data) => {
      if (err) {
        console.error("Error fetching slider offers:", err);
        reject(err);
      } else {
        console.log("Slider offers data fetched:", data);
        resolve(data);
      }
    });
  });
};

module.exports = sliderOfferControllers;
