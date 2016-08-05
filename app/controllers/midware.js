//midware for user
exports.signinRequired = function(req, res, next) {
	var user = req.session.user;
	if (!user) {
		return res.redirect('/signin')
	}
	next()
}

//midware for admin
exports.adminRequired = function(req, res, next) {
	var user = req.session.user;
	if (user.role <= 10) {
		return res.redirect('/signin')
	}
	next()
}