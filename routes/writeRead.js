'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

wrRoute.post('./orders',function(req,res,next){
    const {customer_name, product, quantity, order_date, status} = req.body;

    if(!customer_name || !product || !quantity || !order_date ||!status) {
        return resizeBy.status(400).send('Missing required fields');
    }
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    const now = new Date().toISOString().slice(0,19).replace('T', ' ');
    connection.execute(`INSERT INTO Users_tbl(customer_name, product, quantity, order_date, status , created_at , updated_at)VALUES(?,?,?,?,?,?,?,);`
    [req.body.customer_name,req.product,req.body.quantity,req.body.order_date,req.body.status,mypass
        ,now, now]).then(() => {
            console.log('ok');
        }).catch((err) =>{

            console.log(err);
        });
        res.end();
});

wrRoute.get('/orders', function (req, res , next){
    connection.execute('SELECT * FROM order_tbl;')
    .then((result) =>{
        var rawData = result[0];
        res.send(JSON.stringify(rawData));

    }).catch((err) =>{
        console.log(err);
    });
    req.status(200).Send("Update Successfully.");
});

wrRoute.post('/check',function(req, res ,next){
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute('SELECT * FROM order_tbl WHERE customer_name=? , product=? ,quantity=? ,order_date=? ,status=?;'
        [req.body.customer_name ,req.body.product,req.body.quantity,req.body.order_date , req.body.status ,mypass ]).then((result) => {
            var data = result[0];
            if (data.length === 0){
                res.sendStatus(400);
            }else{
                res.sendStatus(200);

            }





        }).catch((err) => {
            console.log(err);
            res.sendStatus(404);


        });
});
