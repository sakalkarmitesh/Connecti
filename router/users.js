const express=require('express');
const passport = require('passport');
const router=express.Router();
const userController=require('../controller/user_controller');
const User = require('../models/user');


router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
//profile update
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.post('/create',userController.create);
router.get('/sign-out',userController.destroySession);
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'}),userController.createSession);

//google oauth
router.get('/auth/google', passport.authenticate('google', {scope : ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'sign-in'}), userController.createSession);

module.exports=router;