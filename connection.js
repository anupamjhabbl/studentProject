const connect = async () => {
    const mongoose = require('mongoose');
    await mongoose.connect("mongodb://0.0.0.0:27017/student",{
        useNewUrlParser:true, 
        useUnifiedTopology:true
    });
    console.log("connected successfully");
}

module.exports = connect;

