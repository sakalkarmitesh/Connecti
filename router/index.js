const express=require('express');
const router=express.Router();
const homeController=require('../controller/home_controller');

router.get('/',homeController.home);
router.use('/likes',require('./likes'));
router.use('/users',require('./users'));
//post
router.use('/post',require('./post'));
router.use('/comments',require('./comments'));
module.exports=router;