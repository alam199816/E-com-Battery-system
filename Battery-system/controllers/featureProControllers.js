// const db = require('../db/connect.js');

// const featureProControllers = (req, res) => {
//   const query = "SELECT * FROM featurepro";
//   console.log("Executing query:", query);

//   db.query(query, (err, data) => {
//     if (err) {
//       return res.status(500).send(err);
//     } else {
//       const features = data;
//       res.render('index', { features });
//     }
//   });
// };

// module.exports = featureProControllers;
const db = require('../db/connect.js');

const featureProControllers = () => {
  const query = "SELECT * FROM featurepro";
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

module.exports = featureProControllers;
