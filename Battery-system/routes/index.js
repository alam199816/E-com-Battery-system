const express = require('express');
const router = express.Router();

const proCatControllers = require('../controllers/proCatControllers');
const featureProControllers = require('../controllers/featureProControllers');
const offerControllers = require('../controllers/offerControllers');
const recentControllers = require('../controllers/recentControllers');
const blogControllers = require('../controllers/blogControllers');
const UserRegControllers = require('../controllers/UserRegControllers');
const UserLoginControllers = require('../controllers/UserLoginControllers');
const brandControllers = require('../controllers/brandControllers');
const contactUsControllers = require('../controllers/contactUsControllers');
const productsControllers = require('../controllers/productsControllers');
const detailControllers = require('../controllers/detailControllers');
const { cartControllers, removeProductFromCart } = require('../controllers/cartControllers');
const checkoutControllers = require('../controllers/checkoutControllers');
const slideControllers = require('../controllers/slideControllers');
const sliderOfferControllers = require('../controllers/sliderOfferControllers');
const logOutControllers = require('../controllers/logOutControllers');

router.get('/', (req, res) => {
  Promise.all([
    proCatControllers(), 
    featureProControllers(), 
    offerControllers(), 
    recentControllers(), 
    blogControllers(), 
    brandControllers(), 
    slideControllers(), 
    sliderOfferControllers(),
  ])
  .then(results => {
    const [items, features, offers, recents, blogs, brands, slides, headOffer] = results;
    results.forEach((result, index) => {
      console.log(`Result ${index}:`, result);
    });

    if (!slides || !headOffer) {
      throw new Error('Slides or HeadOffer data is missing');
    }
    res.render('index', { items, features, offers, recents, blogs, brands, slides, headOffer });
  })
  .catch(err => {
    console.error('Error rendering the page:', err);
    res.status(500).send('Internal Server Error');
  });
});

router.get('/thank-you', (req, res) => {
  res.render('thank-you');
});

router.get('/shop', function(req, res) {
    res.render('shop');
});

router.get('/register', function(req,res){
res.render('register');
})

router.get('/login',function(req,res){
  res.render('login');
})

router.get('/logout', logOutControllers);
router.post('/add_to_cart');
router.delete('/cart/remove/:id', removeProductFromCart);
router.get('/checkout', checkoutControllers.checkoutpage);
router.post('/checkout', checkoutControllers.checkoutfun);
router.get('/cart',cartControllers);
router.post('/cart',cartControllers);
router.get('/products/:id', productsControllers);
router.get('/detail/:id', detailControllers);
router.post('/detail/:id', detailControllers);
router.post('/register', UserRegControllers);
router.post('/login',UserLoginControllers);
router.post('/contactUs', contactUsControllers);


// router.post('/place-order', (req, res) => {
//   res.render('place-order');
// });
// Route to handle order placement
// router.post('/place-order', (req, res) => {
//   // Extract form data from the request body
//   const formData = req.body;

//   // Process the form data (e.g., save it to the database, send an email, etc.)
//   console.log('Form Data:', formData);

//   // Send a response to the client
//   res.send('Order placed successfully!');
// });

module.exports = router;
