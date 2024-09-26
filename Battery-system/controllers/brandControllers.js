const db = require('../db/connect.js');
const brandControllers = ()=>{
  const query = 'SELECT*FROM brands';
  console.log("Executing query:", query);
   return new Promise((resolve,reject)=>{
    db.query(query,(err,items)=>{
     if(err){
       reject(err);
     }else{
       resolve(items);
     }
    });
   });
};
module.exports=brandControllers;