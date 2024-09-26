
const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  adminControllers,
  createCategory,
  createCarousel,
  createProduct,
  createRecent,
  createFeature,
  createBrand,
  createBlog,
  createOffer,
  likeProduct,
  createSlider,
  createSliderOffer,
  createSeller,
  deleteItem,
  getEditForm,
  updateItem

} = require('../controllers/adminControllers');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

// Routes
router.get('/login', (req, res) => {
  res.render('admin/admin_login.ejs');
});

router.get('/register', (req, res) => {
  res.render('admin/admin_reg.ejs');
});

router.get('/contactUs', (req, res) => {
  res.render('admin/contactUs.ejs');
});

router.delete('/deleteItem/:itemType/:id', deleteItem);
router.get('/dashboard', adminControllers);
router.get('/edit/:type/:id', getEditForm);
router.post('/update/:type/:id', upload.single('image'), updateItem);
// router.get('/admin/getItem',adminControllers);
// router.post('/admin/updateItem', upload.single('image'),adminControllers);
// Individual routes for each form submission
// router.post('/createSeller',createSeller );
router.post('/createSeller', upload.single('image'), createSeller);
router.post('/createCategory', upload.single('image'), createCategory);
router.post('/createCarousel', upload.single('image'), createCarousel);
router.post('/createProduct', upload.single('image'), createProduct);
router.post('/createRecent', upload.single('image'), createRecent);
router.post('/createFeature', upload.single('image'), createFeature);
router.post('/createBrand', upload.single('image_url'), createBrand);
router.post('/createBlog', upload.single('image'), createBlog);
router.post('/createOffer', upload.single('image'), createOffer);
router.post('/likeProduct', upload.single('image_url'), likeProduct);
router.post('/createSlider', upload.single('image'), createSlider);
router.post('/createSliderOffer', upload.single('image'), createSliderOffer);


module.exports = router;