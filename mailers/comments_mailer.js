const nodeMailer=require('../config/nodemailer');

//this is another way of exporting a method
exports.newComment=(comment)=>{

    console.log('inside newComment mailer');

    nodeMailer.transporter.sendMail({
        from : 'sakalkarmitesh77@gmail.com',
        to:comment.user.email,
        subject: "New Comment Published",
        html:"<h1>Yup, your comment is now published!",

    },(err,info)=>{
        if(err){
            console.log('Error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    });
}