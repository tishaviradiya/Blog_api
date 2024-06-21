const express=require('express');
const port=8001;
const app=express();
const db=require('./config/mongoose');
const passport=require('passport')
const passportJwtStrategy=require('./config/passportJwtStrategy');
const session=require('express-session');
app.use(express.urlencoded());
app.use(session({
    name:'BlogApi',
    secret:'blog',
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:1000*60*60,
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api',require('./routes/API/V1'));
app.listen(port,(err)=>{
    err?console.log(err):console.log(`port is running on server !`);
});