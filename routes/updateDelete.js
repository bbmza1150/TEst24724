'use strict';

const express = require(express);
const udRoute = express.Router();
const connection = require('../db');

udRoute.put('/orders:oid', function (req,res,next){
    connection.execute("UPDATE order_tbl SET customer_name=? , product=? ,quantity=? ,order_date=? ,status=?;"
        [req.body.customer_name ,req.body.product,req.body.quantity,req.body.order_date , req.body.status ,mypass ])
        .then(() =>{
            console.log('ok');
        }).catch((err) =>{
            console.log(err);
        });
        res.status(200).send("Update Successfully.");
   } );
   udRoute.delete('/orders:oid',function(req,res,next){
    connection.execute("DELETE FORM order_tbl WHERE customer_name=? , product=? ,quantity=? ,order_date=? ,status=?;",
        [res.params.uid]
    ).then(() => {
        console.log('ok');

    }).catch((err) => {
        console.log(err);
    });
    res.end();


   });
   udRoute.use('/' , function(req,res,next){
    res.sendStatus(404);

})
module.exports = udRoute;
