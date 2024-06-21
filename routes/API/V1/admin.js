const express=require('express')
const routes=express.Router();
const adminController=require('../../../controllers/API/V1/adminCtrl')
routes.post('/register',adminController.register);
routes.post('/adminLogin',adminController.adminLogin);
module.exports=routes;