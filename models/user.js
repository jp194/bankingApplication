const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
     name: {
      type:String,
      required:true
     },

     email :  {
        type: String,
        required: true
    },
     

    balance:{
        type : Number,
        required:true
    }

    }, {
        timestamps: true
    });

var Users=mongoose.model('User',UserSchema);

module.exports=Users;