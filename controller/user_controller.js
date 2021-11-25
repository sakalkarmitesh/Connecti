const User = require('../models/user');

module.exports.profile = function (req, res) {

    User.findById(req.params.id, function (err, user) {
        return res.render('user_profile', {
            title: "profile",
            profile_user: user
        });
    })

}

module.exports.signUp = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up', {
        title: "sign up"
    });
}

module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "sign in"
    });
}


//when the user sign-up the user will get created in db
module.exports.create = function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('error in finding in user');
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    console.log('error in finding in user');
                    return;
                }
                return res.redirect('/users/sign-in')
            })
        }
        else {
            return res.redirect('back');
        }
    });
}


//when the user signed in then create a session
module.exports.createSession = function (req, res) {

    return res.redirect('/');
}

//sign out 
module.exports.destroySession = function (req, res) {
    req.logout();


    return res.redirect('/');
}

//profile upadate
module.exports.update = async function (req, res) {
    if (req.user.id == req.params.id) {
        try {

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {

              if(err){
                  console.log('*****multer error:',err);
                  
              }
            //   console.log(req.file);
            user.name = req.body.name;
            user.email = req.body.email;
            
            if (req.file) {
               
                //this is saving the path of the uploaded file into the avatar field in user
                user.avatar = User.avatarPath + '/' + req.file.filename;

            }
            user.save();
             return res.redirect('back');
            });

        } catch (err) {
            return res.redirect('back');
        }

    } else {
        return res.status(401).send('Unauthorized');
    }

}