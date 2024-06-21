const Admin=require('../../../models/adminModel')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
module.exports.register=async(req,res)=>{
    try{
        console.log(req.body);
        let checkEmail=await Admin.findOne({email:req.body.email});
        console.log('checkEmail',checkEmail);
        if(! checkEmail){
            if(req.body.password==req.body.confirm_password){
                req.body.password=await bcrypt.hash(req.body.password,10);
                let addAdminData=await Admin.create(req.body);
                if(addAdminData){
                    return res.status(200).json({message:'registration successfully !',status:1,data:addAdminData})
                }
                else{
                    return res.status(400).json({message:'something is wrong !',status:0})
                }
            }
            else{
                return res.status(400).json({message:'password and confirm_password are not same !',status:0})
            }
        }
        else{
            return res.status(400).json({message:'email is already exist !',status:0})
        }
    }
    catch(err){
        res.status(400).json({message:'error',status:0})
    }
}
module.exports.adminLogin=async(req,res)=>{
    try{
        console.log(req.body);
        let checkEmail=await Admin.findOne({email:req.body.email});
        if(checkEmail){
            console.log('Hashed Password:', checkEmail.password);
            console.log('Entered Password:', req.body.password);
            if(await bcrypt.compare(req.body.password,checkEmail.password)){
                let token=jwt.sign({adminToken:checkEmail},'RNW',{expiresIn:'6h'});

                res.status(200).json({message:'Login successfully !',status:1,data:token});     
            }
            else{
                res.status(400).json({message:'Invalid Password !',status:0})
            }
        }
        else{
            res.status(400).json({message:'Invalid Email  !',status:0});
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:'error',status:0})
    }
}