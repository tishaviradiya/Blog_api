const passport=require('passport');
const Admin = require('../models/adminModel');
const passportStrategy=require('passport-jwt').Strategy;
const jwtExtract=require('passport-jwt').ExtractJwt;
const options={
    jwtFromRequest :jwtExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'RNW',
}
passport.use(new passportStrategy(options,async(adminData,done)=>{
    let adminRecord=await Admin.findById(adminData.adminToken._id);
    if(adminRecord){
        return done(null,adminRecord)
    }
    else{
        return done(null,false);
    }
}));
passport.serializeUser((user,done)=>{
    return done(null,user.id);
});
passport.deserializeUser(async(id,done)=>{
    let findId=await Admin.findById(id);
    if(findId){
        return done(null,findId);
    }
    else{
        return done(null,false);
    }
});
module.exports=passport;