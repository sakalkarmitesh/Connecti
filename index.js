const express =require('express');
//for layout
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose'); //db
//used for session cookie
const passport=require('passport');
const session=require('express-session');
const passportGoogle=require('./config/passport-google-oauth2-strategy');

const MongoStore=require('connect-mongo');

//authentication Stretegy
const passportLocal=require('./config/passport-local-strategy');
//sass
const sassMiddleware=require('node-sass-middleware');

const port=8000;
const app =express();

//scss
app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}));

//static file
app.use(express.static('./assets'));

app.use('/uploads',express.static(__dirname + '/uploads'));
//layouts
app.use(expressLayouts);

//for the post request
app.use(express.urlencoded());


//extract styles and scripts from sub pages to layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name : 'connection', //cookie name
    secret : '2s5v8y/B?D(G+KbPeShVmYq3t6w9z$C&', //encryption key
    saveUninitialized: false, //when user is not logged in no data is saved in cookie
    resave: false, //we do not want to rewrite session cookie if it is not changed
    cookie: {
        maxAge : (1000*60*60*3) //age of the cookie in miliseconds --> 3 hours
    },
    store : MongoStore.create(
        {
            mongoUrl : 'mongodb://localhost/social_media',
        },
    )
}));
//we need to app to use passport
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//use express router
app.use('/',require('./router'));// this should be after the passport initialize other wise it will give a error

//server running
app.listen(port,function(err){
    if(err){
        console.log(`error in running the server ${err}`);
    }
    console.log(`server is running on port: ${port}`);
})