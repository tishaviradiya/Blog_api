const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1/Blog_Api')
const db=mongoose.connection;
db.once('open',async(err)=>{
    try{
        err?console.log(err):console.log(`db is connected !`);
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:'error',status:0})
    }
})