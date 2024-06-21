const moment = require('moment');
const Blog=require('../../../models/blogModel');
const path=require('path');
const fs=require('fs');
module.exports.add_blog=async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.file);
        let img='';
        if(req.file){
            img=Blog.iPath+'/'+req.file.filename;
        }
        req.body.image=img;
        req.body.created_date=moment().format('LLL');
        req.body.updated_date=moment().format('LLL');
        let addBlogData=await Blog.create(req.body);
        if(addBlogData){
            return res.status(200).json({message:'Blogdata inserted successfully !',status:1,data:addBlogData})
        }
        else{
            return res.status(400).json({message:'Blogdata not inserted !',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.get_blog=async(req,res)=>{
    try{
        let findBlogData=await Blog.find();
        if(findBlogData){
            return res.status(200).json({message:'get the Blogdata !',status:1,data:findBlogData})
        }
        else{
            return res.status(400).json({message:'cannot get blogdata !',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.delete_blog=async(req,res)=>{
    try{
        let findId=await Blog.findById(req.params.id);
        if(findId){
            let imagePath=path.join(__dirname,'../../../',findId.image);
            await fs.unlinkSync(imagePath)
        }
        let delete_blogData=await Blog.findByIdAndDelete(req.params.id);
        if(delete_blogData){
            return res.status(200).json({message:'data deleted successfully !',data:delete_blogData,status:1})
        }
        else{
            return res.status(400).json({message:'data not deleted !',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}
module.exports.edit_blog=async(req,res)=>{
    try{
        let findId=await Blog.findById(req.params.id);
        if(req.file){
            if(findId){
                let imagePath=path.join(__dirname,'../../../',findId.image);
                await fs.unlinkSync(imagePath);
            }
            let img='';
            req.body.image=Blog.iPath+'/'+req.file.filename;
        }
        else{
            if(findId){
                req.body.image=findId.image;
            }
        }
        req.body.updated_date=moment().format('LLL');
        let edit_blogData=await Blog.findByIdAndUpdate(req.params.id,req.body);
        if(edit_blogData){
            return res.status(200).json({message:'Blogdata edited successfully !',status:1,data:edit_blogData})
        }
        else{
            return res.status(400).json({message:'Blogdata not edited !',status:0})
        }
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
}