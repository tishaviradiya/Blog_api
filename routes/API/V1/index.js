const express=require('express')
const routes=express.Router();
const passport=require('passport');
routes.use('/admin',require('./admin'));
routes.use('/blog',passport.authenticate('jwt',{failureRedirect:'/api/cannotgetBlog'}),require('./blog'));
routes.get('/cannotgetBlog',async(req,res)=>{
    try{
        return res.status(400).json({message:'first you have to login !',status:0})
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
})
module.exports=routes;