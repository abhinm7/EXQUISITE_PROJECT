var express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var router = express.Router();
var db=require('./db.js');

router.get('/',(req,res)=>{
    db.query('SELECT * FROM productdetails', (err, rows) => {
        if (err) {
          throw err;
        }
        const data1=rows;
    db.query('SELECT * FROM customer',(err,rows2)=>{
      if(err){
        throw err;
      }
      const data2=rows2;
    db.query('SELECT * FROM userdata',(err,rows3)=>{
      if(err){
        throw err;
      }
      const user=rows3;
      db.query('SELECT * FROM orders',(err,row4)=>{
        if(err){
          throw err;
        }
        const orderS =row4;
        db.query('SELECT o.*,c.img FROM orderdetails o LEFT JOIN productdetails c ON o.productId=c.productId',(err,row5)=>{
          if(err){
            throw err;
          }
          res.render('admin',{ data: data1 ,tdata:data2,userdata:user,orders:orderS,ordersDetails:row5});

        })
    })
})
})
});
    
    
    
})


router.post('/updateDetails',(req,res)=>{
  const name=req.body.name;
  const company=req.body.company;
  const price=req.body.price;
  const id=req.body.id;

  const sql=`UPDATE productdetails SET name=?,company=?,price=? WHERE productId=?`;

  db.query(sql,[name,company,price,id],(err,result)=>{
    if(err){
      console.error('Error updating order: ' + err.stack);
      res.status(500).send('Error updating order');
      return;
    }
    console.log('Order updated successfully');
        res.redirect('/admin'); 

  })
})
router.post('/delete',(req,res)=>{
  const deleteId=req.body.id;
  sql='DELETE FROM userdata WHERE id=?';

  db.query(sql,[deleteId],(err,result)=>{
    if (err) {
      console.error('Error deleting data from table: ' + err.stack);
      res.status(500).send('Error deleting data from table');
      return;
    }
    console.log('Data deleted successfully');
    res.redirect('/admin'); // Redirect back to viewData page after deletion
  });
})

module.exports = router;