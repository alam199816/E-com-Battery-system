// const db = require('../db/connect.js')
// const detailControllers = (req,res,next)=>{
//     const detailId = req.params.id;
//     req.session.cart = req.session.cart || [];
//     req.session.cart.push(detailId);
//     const query = "SELECT*FROM detail WHERE id = ?";
//     db.query(query, [detailId],(error,items)=>{
//      if(error){
//         console.error('error in database query',error);
//         res.status(500).send('internal server error');
//      }
//      else{
//         // const details = items;
//         console.log('details data', items)
//         res.render('detail',{details:items});
//      }
//     });
// };
// module.exports = detailControllers;

// const db = require('../db/connect.js');

// const detailControllers = (req, res, next) => {
//     const detailId = req.params.id;
//     req.session.cart = req.session.cart || [];
//     req.session.cart.push(detailId);

//     const detailQuery = "SELECT * FROM detail WHERE id = ?";
//     const carouselQuery = "SELECT image FROM carousel";

//     db.query(detailQuery, [detailId], (error, detailItems) => {
//         if (error) {
//             console.error('Error in detail query', error);
//             return res.status(500).send('Internal server error');
//         }

//         db.query(carouselQuery, (carouselError, carouselItems) => {
//             if (carouselError) {
//                 console.error('Error in carousel query', carouselError);
//                 return res.status(500).send('Internal server error');
//             }

//             if (detailItems.length > 0) {
//                 const details = detailItems[0];
//                 details.carouselImages = carouselItems.map(item => item.image);

//                 console.log('Details data', details);
//                 res.render('detail', { details });
//             } else {
//                 res.status(404).send('Product not found');
//             }
//         });
//     });
// };

// module.exports = detailControllers;

const db = require('../db/connect.js');

const detailControllers = (req, res, next) => {
    const detailId = req.params.id;
    req.session.cart = req.session.cart || [];
    req.session.cart.push(detailId);


    // Join query to fetch detail and carousel images
    const query = `SELECT d.*, GROUP_CONCAT(c.image) AS carouselImages FROM detail d LEFT JOIN carousel c ON d.id = c.id WHERE d.id = ? GROUP BY d.id`;
    const likesProductQuery = "SELECT * FROM likes_product";
   db.query(query, [detailId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Server error');
        }

        if (results.length > 0) {
            const detail = results[0];
            detail.carouselImages = detail.carouselImages ? detail.carouselImages.split(',') : [];


            db.query(likesProductQuery, (likesErr, likesResults) => {
                if (likesErr) {
                    console.error('Error executing likes_product query:', likesErr);
                    return res.status(500).send('Server error');
                }
                
                    const likes = likesResults[0];
                console.log('Detail data:', detail);
                console.log('Likes data:', likesResults);

                res.render('detail', {details: [detail],likes: likesResults});
            });
        } 
    });
};

module.exports = detailControllers;

