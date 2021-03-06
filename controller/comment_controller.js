const Comment=require('../models/comment');
const Post = require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');
module.exports.create= async function(req,res){
    try{
        let post=await Post.findById(req.body.post);

        if(post){
          let comment= await  Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            });
            
            post.comments.push(comment);
            post.save();
         
            // comment=await comment.populate('user','name').execPopulate();
            
            
            // commentsMailer.newComment(comment);
            res.redirect('/');
            
        }
    }catch(err){
        console.log('error',err);
     return;

    }
   
}