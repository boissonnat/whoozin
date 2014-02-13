
exports.signUp = function(req, res) {
    res.render('guest/signUp', { title: 'Sign up' });
};

exports.doSignUp = function(Parse) {
    return function(req, res) {
        var post = req.body;
        if (post.password === post.confirmPassword) {
            var user = new Parse.User();
            user.set("username", post.username);
            user.set("email", post.email);
            user.set("password", post.password);

            user.signUp(null, {
                success: function(user) {
                    res.redirect("/")
                },
                error: function(user, error) {
                    res.render('guest/signUp', {title: 'Sign Up', error: error.message})
                }
            });
        } else {
            res.render('guest/signUp', {title: 'Sign Up', error: "Passwords don't match"})
        }
    }
};


exports.signIn = function(req, res) {
    res.render('guest/signIn', { title: 'Sign in' });
};

exports.doSignIn = function(Parse) {
    return function(req, res) {
        var post = req.body;
        Parse.User.logIn(post.username, post.password, {
            success: function(user) {
                res.redirect("/")
            },
            error: function(user, error) {
                res.render('guest/signIn', {title: 'Sign In', error: error.message})
            }
        });
    }
};

exports.doLogOut = function(Parse) {
    return function(req, res) {
        Parse.User.logOut();
        res.redirect("/")
    }
}


