module.exports = {
    isLoggedInUser (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/signinUser');
    }
};