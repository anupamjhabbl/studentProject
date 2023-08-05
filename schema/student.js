const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const {Schema} = mongoose;

const studentSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength:3
    },
    age:{
        type:Number,
        required:true
    },
    class:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if (!validator.isEmail(value)){
                throw new Error("Email is not valid");
            }
        }
    },
    password:{
        type:String,
        required:true,
    }
})

studentSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password,10);
    next();
})

studentSchema.methods.generateAuthToken =  async function(){
    const token = await jwt.sign({id:this._id},process.env.SECRET_KEY);
    return token;
}

const studentModel = new mongoose.model("Student",studentSchema);

module.exports = studentModel;