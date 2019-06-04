module.exports = {

    ensureAuth: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }else{

            req.flash('error_msg', "Not Authorized");
            res.redirect('/auth/login')
        }


    },
    ensureGuest: (req, res, next) => {
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        }else{
            return next()
        }
    }
};