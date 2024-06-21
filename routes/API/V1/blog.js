const express=require('express')
const routes=express.Router();
const blogController=require('../../../controllers/API/V1/blogCtrl');
const Blog=require('../../../models/blogModel');
routes.post('/add_blog',Blog.uploadImages,blogController.add_blog);
routes.get('/get_blog',blogController.get_blog);
routes.delete('/delete_blog/:id',blogController.delete_blog);
routes.put('/edit_blog/:id',Blog.uploadImages,blogController.edit_blog);
module.exports=routes;