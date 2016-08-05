var Deliveinfo = require('../models/deliveinfo');
var User = require('../models/user');

exports.save = function(req, res) {
	var _user = req.session.user;
	var info = req.body.info
	if(_user) {
		
		var delive = new Deliveinfo(info);
		delive.save(function(err,delive){
			var _userId = _user._id;
			User.findById(_userId, function(err, user){
				if(err) {
					console.log(err)
				}
				user.deliveinfo.push(delive);
				user.save(function(err){
					_user.deliveinfo = user.deliveinfo
					res.json({
						success: 1,
						deliveinfo: delive
					})
				})
				
			})
			
		})
	}
}

exports.del = function(req, res) {
	var _user = req.session.user;
	var _userId = _user._id;
	var infoId = req.query.id;
	if(infoId){
		User.findById(_userId, function(err, user) {
			user.deliveinfo.id(infoId).remove();
			user.save(function(){
				_user.deliveinfo = user.deliveinfo;
				Deliveinfo.remove({_id:infoId}, function(err){
					res.json({
						success:1
					})
				})
			})
			
		})
		
	}
}