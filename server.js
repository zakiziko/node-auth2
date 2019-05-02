const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db/db');
const authRoute = require('./routes/auth-routes');

const passportSetup = require('./config/auth/passport-setup');

const PORT =4001;
const app = express();

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