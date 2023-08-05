const jwt = require('jsonwebtoken');

const auth = async function (req,res,next){
    const data = req.cookies.authToken;
    if (data){
        try{
            // console.log()
            const iddata = jwt.verify(data, process.env.SECRET_KEY);
            req.id = iddata.id;
        }
        catch(err){
            return res.send("hello world");
        }
    }
    else{
        return res.render('login');
    }
    next();
}

module.exports = auth;