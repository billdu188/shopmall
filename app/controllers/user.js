var User = require('../models/user')
var Cake = require('../models/cake');
var Shopcar = require('../models/shopcar');
//signup
exports.signup = function(req, res) {	
	var _user = req.body.user;	
	
	User.findOne({name:_user.name}, function(err, user) {
		if (err) {console.log(err)}

		if (user) {return res.redirect('/signin')}

		else {
			var user = new User(_user);
			user.save(function(err, user) {
				if (err) {
					console.log(err)
				}
				res.redirect('/')
			})
		}
	})
	
}

//signin
exports.signin = function(req, res) {
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;

	User.findOne({name: name}, function(err, user) {
		if (err) {
			console.log(err);
		}
		if (!user) {
			console.log('no user!')
			return res.redirect('/signup')
		}
		
		user.comparePassword(password, function(err, isMath) {
			if (err) {
				console.log(err)
			}
			if (isMath) {
				var _userId = user._id;
				Shopcar.findOne({user:_userId}, function(err, shop) {
					if(!shop) {
						shop = new Shopcar({user:_userId});
						shop.save(function(){
							req.session.user = user;
							req.session.user.sumGoods = shop.sumGoods;
							req.session.user.sumValue = shop.sumValue; 
							return res.redirect('/')
						});
					}else {
						req.session.user = user;
						req.session.user.sumGoods = shop.sumGoods;
						req.session.user.sumValue = shop.sumValue; 
						return res.redirect('/')
					}
				})
				
				
			}
			else {
				console.log('password is not matched')
				res.redirect('/signin')
			}
		})
	})

}

exports.showSignin = function (req, res) {
	res.render('signin', {
		title: '登录页面'
	})
}
exports.showSignup = function (req, res) {
	res.render('signup', {
		title: '注册页面'
	})
}

//logout
exports.logout = function(req, res) {
	delete req.session.user
	//delete app.locals.user

	res.redirect('/')
}

//userlist page
exports.list = function(req, res) {
	User.fetch(function(err, users){
		if (err) {
			console.log(err)
		}
		
		res.render('userlist', {
			title: '用户列表页',
			users: users
		})
	})
}

