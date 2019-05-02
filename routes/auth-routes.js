const route = require('express').Router();
const passport = require('passport');

route.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

route.get('/profile',passport.authenticate('google',{ 
    successRedirect: '/auth/google/success',
    failureRedirect: '/auth/google/failure'
}),(req,res)=>{
    res.send('YOU ARE LOGGED IN WITH GOOGLE')
});
module.exports = route;