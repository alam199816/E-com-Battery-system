const db = require('../db/connect.js');
const blogControllers = ()=>{
  const query = 'SELECT*FROM blog';
  console.log("Executing query:", query);
   return new Promise((resolve,reject)=>{
    db.query(query,(err,data)=>{
     if(err){
       reject(err);
     }else{
       resolve(data);
     }
    });
   });
};
module.exports=blogControllers;