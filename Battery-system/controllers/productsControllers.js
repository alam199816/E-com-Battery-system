const db = require('../db/connect.js');
const productsControllers = (req,res,next) => {
  const id = req.params.id;
  const query = "SELECT * FROM detail WHERE cat_id = "+id+"";
  console.log("Executing query:", query);

    // db.query(query, (err, data) => {
    //   if (err) {
    //     console.error('error in database',err);
    //   } else {
    //     console.log('products data error',data);
    //     const products = data;
    //     res.render('products',{products});
    //     next();
    //   }
    // });
    db.query(query, (err, data) => {
      if (err) {
        console.error('Error in database:', err);
        return next(err); // Pass the error to the error handler middleware
      }
      console.log('Products data:', data);
      res.render('products', { products: data });
    });
};

module.exports = productsControllers;