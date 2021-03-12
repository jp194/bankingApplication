const bodyParser = require('body-parser');

const express=require('express');
const Users=require('../models/user');

const transRouter=express.Router();
transRouter.use(bodyParser.json());



transRouter.route('/')

    
    .get((req,res,next)=>{
     Users.find({})
        .then((users)=>{
            res.render('transHistory',{users:users});
        })
        .catch((err)=>next(err))
      })
     
     .post((req,res,next)=>{
        Users.create(req.body)
        .then((user)=>{
            console.log("Sucessfully posted User");
        })
        .catch((err)=>{
            next(err);
        })
     });


  transRouter.route('/:userId')
     .get((req,res,next)=>{
        Users.findById(req.params.userId)
          .then((user)=>{
              Users.find({})
              .then((users)=>{
            res.render('transaction',{user:user,users:users});
              })
          })
           .catch((err)=>next(err))
     })

     .post((req,res,next)=>{
       console.log(req.body.amount);
      

       Users.findById(req.params.userId)
       .then((user)=>{
         var item=parseInt(user.balance)-parseInt(req.body.amount);
         console.log(item);
         Users.findByIdAndUpdate(req.params.userId,{
          $set:{balance:item}
      },{new:true})
      .then((user) => {
        console.log(item);
        console.log("Succcccccc");

        Users.find({})
        .then((users)=>{
          console.log(req.body.to);
            const use=users.filter((item)=>{
              return item.name==req.body.to
            })[0];
            var item2=parseInt(use.balance)+parseInt(req.body.amount);
            Users.findByIdAndUpdate(use.id,{
              $set:{balance:item2}
          },{new:true})
            
            .then((user)=>{
              Users.findById(req.params.userId)
              .then((myuser)=>{
                res.render('Success',{userfrom:myuser,userto:user,amount:req.body.amount});
              })
              
            })
            
        })
       })
     
    })
      
    .catch((err)=>next(err))
     

     
        
     })
module.exports=transRouter;    
