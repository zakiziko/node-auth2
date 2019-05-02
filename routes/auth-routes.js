const route = require('express').Router();
const passport = require('passport');

route.get('/google',passport.authenticate('google',{
    scope:['profile']
}));

route.get('/profile',passport.authenticate('google'),(req,res)=>{
    res.send('YOU ARE LOGGED IN WITH GOOGLE')
});
module.exports = route;