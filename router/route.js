const express = require('express');
const Student = require('./../schema/student');
const feeModel = require('./../schema/fees');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./../middleware/auth');

const router = express.Router();

// handling register request
router.post('/register', async (req,res) => {
    const student = new Student(req.body);
    const data = await Student.findOne({email:req.body.email});
    if (data){
        await Student.deleteOne({_id:data._id});
    }
    const token = await student.generateAuthToken();
    await student.save();
    res.cookie("authToken",token, {
        httpOnly: true
    });
    res.redirect('/');
})

// handling login request
router.post('/login', async (req,res) => {
    const email = req.body.email;
    const data = await Student.findOne({email:email});
    if (!data){
        res.send("Email is wrong")   // replace it with a proper response
    }
    const result = await bcrypt.compare(req.body.password,data.password);
    if (result){
        const token = await data.generateAuthToken();
        res.cookie("authToken",token, {
            httpOnly: true
        });
        res.redirect('/');
    }
    else{
        res.send("Login credentials are not right");
    }
    // res.send("djjdjjd");
})

// handling updatate request
router.get('/updatePage', auth, async (req,res) => {
    res.render('registration',{
        script:'/js/update.js'
    })
})

router.get('/fee',auth, async (req,res) => {
    res.render('fees');
})

// Give studnet Info
router.get('/studentInfo', auth, async (req,res) => {
    const data = await Student.findOne({_id:req.id});
    data.password = "";
    res.json(data);
})

router.get('/feeInfo', auth, async (req,res) => {
    const data = await feeModel.findOne({id:req.id});
    res.json(data);
})

router.post('/feeSubmit', auth, async (req,res) => {
    const data = await feeModel.findOne({id:req.id});
    if (data){
        let months = (req.body.amount-data.balanceUptoPaidDate)/1000;
        const balance = 1000 - (req.body.amount-data.balanceUptoPaidDate)%1000;
        if (balance!=0){
            months = months + 1;
        }
        data.paidUpto = data.paidUpto.setMonth(data.paidUpto.getMonth()+months);
        data.paidDate.push({date:Date.now(),amount:req.body.amount});
        await feeModel.updateOne({id:req.id},{$set:{paidUpto:data.paidUpto,balanceUptoPaidDate:balance},paidDate:data.paidDate});
        res.redirect('/');
    }
    else{
        const student = await Student.findOne({_id:req.id});
        const months = req.body.amount/1000 + (req.body.amount%1000 ? 1 : 0);
        const balance = 1000 - (req.body.amount%1000 ? req.body.amount%1000 : 1000);
        const arr = [{date:Date.now(),amount:req.body.amount}];
        const today = new Date(Date.now());
        const newStudent = new feeModel({
            id:req.id,
            admissionDate: Date.now(),
            paidUpto: today.setMonth(today.getMonth()+months),
            balanceUptoPaidDate: balance,
            paidDate:arr,
            name: student.name
        });
        await newStudent.save();
        res.redirect('/');
    }
})

module.exports = router;

