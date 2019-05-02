const passport = require('passport');
const googleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../../models/user');

passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then(user=>{
        done(null,user);
    });
});

passport.use(
    new googleStrategy({
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        callbackURL:'/profile'
    },
    (accessToken,refreshToken,profile,done)=>{
        User.findOne({googleId:profile.id}).then(cuurentUser=>{
            if(cuurentUser){
                done(null,cuurentUser);
                console.log('CURRENT USER '+cuurentUser);
            }else{
                const newUser = new User({
                    username:profile.displayName,
                    googleId: profile.id
                });
                newUser.save().then(user=>{
                    console.log('new user created :' +user);
                    done(null,user);
                });
            }
        })
    })
)