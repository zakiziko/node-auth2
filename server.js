const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db/db');
const authRoute = require('./routes/auth-routes');
const sessionCookie = require('cookie-session');
const passportSetup = require('./config/auth/passport-setup');
const passport = require('passport');

const PORT =4001;
const app = express();

app.use(sessionCookie({
    maxAge:24*60*60*1000,
    keys:['test']
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(dbConfig.dbUri,dbConfig.options,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('YOU ARE CONNECTED TO DB');
    }
});

app.use(authRoute);
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON ${PORT}`);
})