const Post = require('../models/post');
const User=require('../models/user');
const Comment = require('../models/comment');
module.exports.create = async function (req, res) {

    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
        });

        let user = await User.findById(req.user._id);
        user.save();

        if(req.xhr){
        //    to send the users name we need to populate it
            // let post= await Post.find({})
            // .populate('user')
            // .populate({
            //     path:'comments',
            //     populate:{
            //          path:'user'
            //     }
            // }); 
            // post = await post.populate('user', 'name avatar').execPopulate()
            return res.status(200).json({
                data:{
                    post:post
                },
                message:"Post created"
            });
        }
        return res.redirect('back');
    } catch (err) {
        console.log('error', err);
        return;
    }

}

module.exports.destroy = async function (req, res) {
    try {
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id});
             
            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted"
                });
            }
            return res.redirect('back');
        } else {
            return res.redirect('back');
        }

    } catch (err) {
        console.log('error', err);
        return;
    }



}