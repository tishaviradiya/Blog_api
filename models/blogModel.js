const mongoose=require('mongoose');
const multer=require('multer');
const imgPath='/uploads/blog';
const path=require('path');
const blogSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    created_date:{
        type:String,
        required:true,
    },
    updated_date:{
        type:String,
        required:true,
    }
});
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'..',imgPath))
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
});
blogSchema.statics.uploadImages=multer({storage:storage}).single('image');
blogSchema.statics.iPath=imgPath;
const Blog=mongoose.model('Blog',blogSchema)
module.exports=Blog;