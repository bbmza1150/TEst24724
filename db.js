const mysql = require('mysql2');
const dbConFig = require('./db.con.fig');

constdbConfig = require('./db.con.fig');

const connection = mysql.createPool({

    host: dbConFig.HOST,
  
    user: dbConFig.USER,

    database: dbConFig.DATABASE,

    password:dbConFig.PASSWORD,

    prt: dbConFig.PORT,
  
    
     
});

module.exports = connection.promise();