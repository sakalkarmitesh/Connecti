const passport=require('passport');
const User=require('../models/user'); //import the USer model
const LocalStrategy=require('passport-local').Strategy; //using the local strategy

//we need to tell passport to use local strategy that we have created
passport.use(new LocalStrategy({   //authenticate using passport
    usernameField:'email',
      
  },
   function(email,password,done){
    //find the user and established the identity
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('error in finding user');
            return done(err);
        }
        if(!user || user.password!=password){
          console.log('error in password');
            
            return done(null , false);
        }

        return done(null,user);
    });
  }
));

// serialize the user to decide which key is to be kept in the cookie
//serializer and deserializer both are inbuilt function
passport.serializeUser(function(user,done){
    
    done(null,user.id);
});

//deserialize the user from the key in the cookie
passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user){

        if(err){
            
            return done(err);
        }
        return done(null,user);
    });
});

//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if the user is sign-in then pass on the request to the next function

    if(req.isAuthenticated()){// this detects wether the user is signed in or not
        return next();
    }

    //if the user is not sign in return back;
    return res.redirect('/users/sign-in')
}

passport.setAuthenticatedUser=function(req,res,next){
    
    if(req.isAuthenticated()){
        
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport;