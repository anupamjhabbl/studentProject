require('dotenv').config();
const express = require('express');
const app = express();
const connect = require('./connection');
const router = require('./router/route');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const port = process.env.PORT;
const feesModel = require('./schema/fees');

const mainfunc = async () => {
    await connect();
    
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(express.json());
    app.use(router);
    app.use(express.static('public'));
    app.set('view engine', 'hbs');
    app.set('views',path.join(__dirname,"./templates/views"));
    hbs.registerPartials(path.join(__dirname,"./templates/partials"));

    app.get('/', auth, (req,res) => {
        res.render('student');
    })

    app.get('/login', (req,res) => {
        res.render('login');
    })

    app.get('/register', (req,res) => {
        res.render('registration');
    })

    app.get('/logout',auth, (req,res) => {
        res.clearCookie("authToken");
        res.redirect('/login');
    })


    app.listen(port, () => {
        console.log("Server is listening on http://localhost:"+port);
    })
}

mainfunc();