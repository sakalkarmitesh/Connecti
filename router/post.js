const express=require('express');
const passport=require('passport');
const router=express.Router();
const postsController=require('../controller/post_controller');

router.post('/create',passport.checkAuthentication,postsController.create);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);
module.exports=router;