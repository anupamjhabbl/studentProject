const mongoose = require('mongoose');
const {Schema} = mongoose;

const feeSchema = new Schema({
    id:{
        type:String,
        require:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    admissionDate:{
        type:Date,
        require:true
    },
    paidUpto:{
        type:Date,
        required:true
    },
    balanceUptoPaidDate:{
        type:Number,
        required:true
    },
    paidDate: {
        type:[{date:Date, amount:Number}],
        required:true
    }

})

const feesModel = new mongoose.model("StudentFee",feeSchema);

module.exports = feesModel;