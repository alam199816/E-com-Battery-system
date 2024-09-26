
const db = require('../db/connect.js');

// Function to fetch all data for dashboard
const adminControllers = async (req, res) => {
  try {
    console.log(req.session, 'req.session is '); // Log the entire session object
    const queryDatabase = (sql) => {
      return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    };

    const categories = await queryDatabase('SELECT * FROM pro_cat');
    const carousels = await queryDatabase('SELECT * FROM carousel');
    const pros = await queryDatabase('SELECT * FROM detail');
    const features = await queryDatabase('SELECT * FROM featurepro');
    const recents = await queryDatabase('SELECT * FROM recent_pro');
    const brands = await queryDatabase('SELECT * FROM brands');
    const blogs = await queryDatabase('SELECT * FROM blog');
    const offers = await queryDatabase('SELECT * FROM offers');
    const contacts = await queryDatabase('SELECT * FROM contactus');
    const likes = await queryDatabase('SELECT * FROM likes_product');
    const slides = await queryDatabase('SELECT * FROM slider');
    const slide_offers = await queryDatabase('SELECT * FROM slider_offer');
    const sellers = await queryDatabase('SELECT * FROM sellers');

    const firstName = req.session.firstName;
    console.log('fetched from session', firstName);
    res.render('admin/dashboard', { categories, carousels, pros, features, recents, brands, blogs, offers, contacts, likes, slides, slide_offers, firstName, sellers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


// Function to handle category creation
const createCategory = (req, res) => {
  const { title, qty } = req.body;
  const image = req.file.filename;
  const sql = 'INSERT INTO pro_cat (image, title, qty) VALUES (?, ?, ?)';

  db.query(sql, [image, title, qty], (err, result) => {
    if (err) {
      console.error('Error inserting category:', err);
      return res.status(500).send('Internal Server Error in category');
    }
    console.log('Category inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};

// Function to handle slider creation
const createSlider = (req, res) => {
  const { title, description, button1_text, button1_link, button2_text, button2_link } = req.body;
  const image = req.file.filename;
  const sql = 'INSERT INTO slider (image,title, description, button1_text, button1_link, button2_text, button2_link) VALUES (?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [image, title, description, button1_text, button1_link, button2_text, button2_link], (err, result) => {
    if (err) {
      console.error('Error inserting slider:', err);
      return res.status(500).send('Internal Server Error in slider');
    }
    console.log('Slider inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};


// Function to handle head slider offer creation
const createSliderOffer = (req, res) => {
  const { offer_text, offer_subtitle, button_text, button_link } = req.body;
  const image = req.file.filename;
  const sql = 'INSERT INTO slider_offer (image, offer_text, offer_subtitle, button_text, button_link) VALUES (?, ?, ?, ?, ?)';

  db.query(sql, [image, offer_text, offer_subtitle, button_text, button_link], (err, result) => {
    if (err) {
      console.error('Error inserting createSliderOffer:', err);
      return res.status(500).send('Internal Server Error in createSliderOffer');
    }
    console.log('createSliderOffer inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};

// Function to handle carausel creation
const createCarousel = (req, res) => {
  const image = req.file.filename;
  const sql = 'INSERT INTO carousel (image) VALUES (?)';

  db.query(sql, [image], (err, result) => {
    if (err) {
      console.error('Error inserting carausel:', err);
      return res.status(500).send('Internal Server Error in carousel');
    }
    console.log('carousel image inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};


// Function to handle products creation
const createProduct = (req, res) => {
  const { cat_id, title, reviews, ratings, desc, price, capacity, technology, warranty, features, weight, product_qty } = req.body;
  const image = req.file.filename;
  const sql = 'INSERT INTO detail (cat_id, image, title, reviews, ratings, `desc`, price, capacity, technology, warranty, features, weight, product_qty) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  db.query(sql, [cat_id, image, title, reviews, ratings, desc, price, capacity, technology, warranty, features, weight, product_qty], (err, result) => {
    if (err) {
      console.error('Error inserting in products:', err);
      return res.status(500).send('Internal Server Error in products');
    }
    console.log(' products inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};

// Function to handle recent product creation
const createRecent = (req, res) => {
  const { name, current_price, original_price, rating, review_count } = req.body;
  const image = req.file.filename;
  const sql = 'INSERT INTO recent_pro ( name, review_count, rating, current_price, original_price, image) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(sql, [name, review_count, rating, current_price, original_price, image], (err, result) => {
    if (err) {
      console.error('Error inserting recent product:', err);
      return res.status(500).send('Internal Server Error in recent');
    }
    console.log('Recent product inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};


// Function to handle feature creation
const createFeature = (req, res) => {
  const { name, current_price, original_price, rating, review_count } = req.body;
  const image = req.file.filename;
  const sql = 'INSERT INTO featurepro (name, image, current_price, original_price, rating, review_count) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(sql, [name, image, current_price, original_price, rating, review_count], (err, result) => {
    if (err) {
      console.error('Error inserting feature:', err);
      return res.status(500).send('Internal Server Error in featurepro');
    }
    console.log('Feature inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};


// Function to handle brand creation
const createBrand = (req, res) => {
  const image_url = req.file.filename;
  const sql = 'INSERT INTO brands (image_url) VALUES (?)';

  db.query(sql, [image_url], (err, result) => {
    if (err) {
      console.error('Error inserting brand:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Brand inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};


// Function to handle blog creation
const createBlog = (req, res) => {
  const { title, description } = req.body;
  const image = req.file.filename;
  const sql = 'INSERT INTO blog (image, title, description) VALUES (?, ?, ?)';

  db.query(sql, [image, title, description], (err, result) => {
    if (err) {
      console.error('Error inserting blog:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Blog inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};


// Function to handle offer creation
const createOffer = (req, res) => {
  const { title, discount } = req.body;
  const image = req.file.filename;
  const sql = 'INSERT INTO offers (image, title, discount) VALUES (?, ?, ?)';

  db.query(sql, [image, title, discount], (err, result) => {
    if (err) {
      console.error('Error inserting offer:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Offer inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};

// Function to handle likeProducts creation
const likeProduct = (req, res) => {
  const { name, price, old_price, rating, reviews_count } = req.body;
  const image_url = req.file.filename;
  const sql = 'INSERT INTO likes_product (image_url, name, price, old_price, rating, reviews_count) VALUES (?,?,?,?,?,?)';

  db.query(sql, [image_url, name, price, old_price, rating, reviews_count], (err, result) => {
    if (err) {
      console.error('Error inserting likes_product:', err);
      return res.status(500).send('Internal Server Error in likes_product');
    }
    console.log('likes_product inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};


const createSeller = (req, res) => {
  console.log(req.body);  
  const { seller_name, seller_address, seller_state, gst } = req.body;
console.log(req.body,'seller');
  const sql = 'INSERT INTO sellers (seller_name, seller_address, seller_state, gst) VALUES (?, ?, ?, ?)';

  db.query(sql, [seller_name, seller_address, seller_state, gst], (err, result) => {
    if (err) {
      console.error('Error inserting Seller:', err);
      return res.status(500).send('Seller Internal Server Error');
    }
    console.log('Seller inserted successfully:', result);
    res.redirect('/admin/dashboard');
  });
};

// Function to get the edit form
const getEditForm = async (req, res) => {
  try {
    const id = req.params.id;
    const type = req.params.type;

    let query;
    let data;

    switch (type) {
      case 'product':
        query = 'SELECT * FROM detail WHERE id = ?';
        break;
      case 'category':
        query = 'SELECT * FROM pro_cat WHERE id = ?';
        break;
      case 'carousel':
        query = 'SELECT * FROM carousel WHERE id = ?';
        break;
      case 'feature':
        query = 'SELECT * FROM featurepro WHERE id = ?';
        break;
      case 'recent':
        query = 'SELECT * FROM recent_pro WHERE id = ?';
        break;
      case 'brand':
        query = 'SELECT * FROM brands WHERE id = ?';
        break;
      case 'blog':
        query = 'SELECT * FROM blog WHERE id = ?';
        break;
      case 'offer':
        query = 'SELECT * FROM offers WHERE id = ?';
        break;
      case 'likeProduct':
        query = 'SELECT * FROM likes_product WHERE id = ?';
        break;
      case 'contact':
        query = 'SELECT * FROM contactus WHERE id = ?';
        break;
      default:
        return res.status(400).send('Invalid type');
    }

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error fetching data for edit form:', err);
        return res.status(500).send('Internal Server Error');
      }
      data = results[0];
      res.render('dashboard', { type, data });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Function to update an item
const updateItem = (req, res) => {
  const id = req.params.id;
  const type = req.params.type;
  console.log(`Type: ${type}, ID: ${id}`);
  const { title, description, qty, price, rating, reviews_count, old_price, discount, name } = req.body;
  const image = req.file ? req.file.filename : null;

  let updateQuery;
  let values;

  switch (type) {
    case 'product':
      updateQuery = 'UPDATE detail SET title = ?, description = ?, qty = ?, price = ?, rating = ?, reviews_count = ?, old_price = ?, discount = ?, name = ?, image = ? WHERE id = ?';
      values = [title, description, qty, price, rating, reviews_count, old_price, discount, name, image, id];
      break;
    case 'category':
      updateQuery = 'UPDATE pro_cat SET title = ?, qty = ?, image = ? WHERE id = ?';
      values = [title, qty, image, id];
      break;
    case 'carousel':
      updateQuery = 'UPDATE carousel SET image = ? WHERE id = ?';
      values = [image, id];
      break;
    case 'feature':
      updateQuery = 'UPDATE featurepro SET title = ?, description = ?, image = ? WHERE id = ?';
      values = [title, description, image, id];
      break;
    case 'recent':
      updateQuery = 'UPDATE recent_pro SET name = ?, current_price = ?, original_price = ?, rating = ?, review_count = ?, image = ? WHERE id = ?';
      values = [name, price, old_price, rating, reviews_count, image, id];
      break;
    case 'brand':
      updateQuery = 'UPDATE brands SET image_url = ? WHERE id = ?';
      values = [image, id];
      break;
    case 'blog':
      updateQuery = 'UPDATE blog SET title = ?, description = ?, image = ? WHERE id = ?';
      values = [title, description, image, id];
      break;
    case 'offer':
      updateQuery = 'UPDATE offers SET title = ?, discount = ?, image = ? WHERE id = ?';
      values = [title, discount, image, id];
      break;
    case 'likeProduct':
      updateQuery = 'UPDATE likes_product SET name = ?, price = ?, old_price = ?, rating = ?, reviews_count = ?, image_url = ? WHERE id = ?';
      values = [name, price, old_price, rating, reviews_count, image, id];
      break;
    case 'contact':
      updateQuery = 'UPDATE contactus SET name = ?, email = ?, message = ? WHERE id = ?';
      values = [name, req.body.email, req.body.message, id];
      break;
    default:
      return res.status(400).send('Invalid type');
  }

  db.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error('Error updating item:', err);
      return res.status(500).send('Internal Server Error');
    }
    console.log('Item updated successfully:', result);
    res.redirect('/admin/dashboard');
  });
};

// handle to delete the data
const deleteItem = (req, res) => {
  const itemId = req.params.id;
  const itemType = req.params.itemType;
console.log('itemidssss', itemId);
console.log('itemTypesssss', itemType);
  let query;
  switch (itemType) {
    case 'recent':
      query = 'DELETE FROM recent_pro WHERE id = ?';
      break;
    case 'pro':
      query = 'DELETE FROM detail WHERE id = ?';
      break;
    case 'brand':
      query = 'DELETE FROM brands WHERE id = ?';
      break;
    case 'head':
      query = 'DELETE FROM offers WHERE id = ?';
      break;
    case 'blog':
      query = 'DELETE FROM blog WHERE id = ?';
      break;
    case 'sellerProduct':
      query = 'DELETE FROM sellers WHERE id = ?';
      break;
    case 'carousel':
      query = 'DELETE FROM carousel WHERE id = ?';
      break;
    case 'feature':
      query = 'DELETE FROM featurepro WHERE id = ?';
      break;
    case 'like':
      query = 'DELETE FROM likes_product WHERE id = ?';
      break;
    case 'category':
      query = 'DELETE FROM pro_cat WHERE id = ?';
      break;
    case 'slider':
      query = 'DELETE FROM slider WHERE id = ?';
      break;
    case 'slider_offer':
      query = 'DELETE FROM slider_offer WHERE id = ?';
      break;
    default:
      return res.status(400).json({ success: false, message: 'Invalid item type' });
  }

  db.execute(query, [itemId], (err, results) => {
    if (err) {
      console.error(`Error deleting ${itemType}:`, err);
      return res.status(500).json({ success: false });
    }
    console.log(`Successfully deleted ${itemType} with ID ${itemId}`);
    // res.json({ success: true, message: `Successfully deleted ${itemType}` });
    res.redirect('/admin/dashboard');
  });
};

module.exports = {
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
  getEditForm,
  updateItem,
  deleteItem
  // getItemData
};
