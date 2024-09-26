// const db = require('../db/connect.js');

// const proCatControllers = (req, res) => {
//   const query = "SELECT * FROM pro_cat";
//   console.log("Executing query:", query);

//   db.query(query, (err, data) => {
//     if (err) {
//       return res.status(500).send(err);
//     } else {
//       // console.log(data, 'hey');
//       const details = data;
//       // console.log(details, 'oye');
//       res.render('index', { details });
//     }
//   });
// };

// module.exports = proCatControllers;
const db = require('../db/connect.js');

const proCatControllers = () => {
  const query = "SELECT * FROM pro_cat"; 
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

module.exports = proCatControllers;
