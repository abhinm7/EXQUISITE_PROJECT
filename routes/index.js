var express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var router = express.Router();
var db=require('./db.js');

router.get('/login', function(req, res, next) {
  const sql1 = 'SELECT * FROM productdetails WHERE productId BETWEEN 111 AND 119';
  const sql2 = 'SELECT * FROM productdetails WHERE productId BETWEEN 211 AND 219';
  const sql3 = 'SELECT * FROM productdetails WHERE productId BETWEEN 311 AND 319';
  
  // Use Promise.all to execute all three queries simultaneously
  Promise.all([
    new Promise((resolve, reject) => {
      db.query(sql1, (err, products) => {
        if (err) {
          console.error('Error fetching products:', err);
          reject(err);
          return;
        }
        resolve(products);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(sql2, (err, productsw) => {
        if (err) {
          console.error('Error fetching other data:', err);
          reject(err);
          return;
        }
        resolve(productsw);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(sql3, (err, productsc) => {
        if (err) {
          console.error('Error fetching third data:', err);
          reject(err);
          return;
        }
        resolve(productsc);
      });
    })
  ])
  .then(([products, productsw, productsc]) => {
    // Send multiple sets of data as JSON
    res.json({ products, productsw, productsc });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    res.status(500).send({ error: 'Internal server error' });
  });
});



router.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(path.join(__dirname, 'public')));
router.get('/', (req, res) => {
    res.render('signin');
});

router.post('/signup', (req, res) => {
    let user = { username: req.body.username, password: req.body.password ,name:req.body.name};
    let sql = 'INSERT INTO userdata SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User registered...');
    });
});


router.post('/address', (req, res) => {
  // Extract the form data and order items from the request body
  const { name, phone, pin, address, town, orderItems,bagTotal } = req.body;
  const addressData = { name,phone,pin, address,town };
  const orders = JSON.parse(orderItems);
  const order = orders.map(item => item.productId);
  const bagTot=JSON.parse(bagTotal);

  let discountDec=(bagTot/100)*10;
  let discount=(discountDec).toFixed(2);
  let amt1=(bagTot+686);
      let Price=amt1-discount;
     let numOfitem=orders.length;
  console.log("No of items :",numOfitem);
  console.log(bagTot);
  console.log('Name:', name);
  console.log('price:',Price);

  // Insert the form data into the MySQL database table
  const sql = 'INSERT INTO Customer SET ?';
  db.query(sql, addressData, (err, result) => {
      if (err) {
          console.error('Error inserting data into database:', err);
      } else {
          console.log('Form data inserted into database successfully');
          const customerId = result.insertId; // Use insertId to get the ID of the newly inserted record
          console.log('Customer ID:', customerId);

          // Generate a unique orderId
          // This will be auto-incremented in the 'orders' table
          // No need to generate it manually

          // Insert customerId into the 'orders' table
          const ordersData = { customerId,Price };
          const sqlOrders = 'INSERT INTO Orders SET ?';
          db.query(sqlOrders, ordersData, (err, result) => {
              if (err) {
                  console.error('Error inserting data into orders table:', err);
              } else {
                  console.log('Customer ID inserted into orders table successfully');
                  const orderId = result.insertId; // Use insertId to get the ID of the newly inserted record in the 'orders' table
                  console.log('Order ID:', orderId);

                  // Insert each product ID into the order table with the same orderId
                  order.forEach((productId) => {
                      const orderData = { orderId, productId };
                      const sqlOrder = 'INSERT INTO orderDetails SET ?';
                      db.query(sqlOrder, orderData, (err, result) => {
                          if (err) {
                              console.error('Error inserting data into order table:', err);
                          } else {
                              console.log('Order data inserted into order table successfully');
                          }
                      });
                  });
                  const sql = 'SELECT * FROM Orders';
                  res.render('payment', {
                     orders: orders ,
                     name:name,
                     phone:phone,
                     pin:pin,address:address,
                     town:town,
                     bagTotal:bagTot,
                     discount:discount,
                     finalAmt:Price,
                     number:numOfitem

                  });
              }
          });
      }
  });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  // Check if the user is an admin
  if (username === 'admin' && password === 'admin123') {
      // If admin, render the admin page
      res.redirect('/admin');
  } else {
      // If not admin, check in the user database
      let sql = `SELECT * FROM userdata WHERE username = ${db.escape(username)} AND password = ${db.escape(password)}`;

      db.query(sql, (err, results) => {
          if (err) throw err;
          if (results.length > 0) {
              // If user exists, render the index page
              res.render('index');
          } else {
              // If not admin and user not found, send an error message
              res.send('Invalid username or password');
          }
      });
  }
});


module.exports = router;
