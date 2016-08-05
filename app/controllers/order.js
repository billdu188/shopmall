var Deliveinfo = require('../models/deliveinfo');
var Order = require('../models/order');
var Shopcar = require('../models/shopcar')
var User = require('../models/user')

exports.detail = function(req, res) {
	var _user = req.session.user;
	if(_user){
		var _userId = _user._id;
		Shopcar.findOne({user:_userId},function(err, agoods){
			Order.findOne({user:_userId}, function(err, order) {
				if(!order) {
					order = new Order({user:_userId,agoods:agoods._id});
					order.save(function(err){
						res.render('order', {
							title: '订单详情',
							order: order,
							agoods: agoods
						})
					});
				}

				res.render('order', {
					title: '订单详情',
					order: order,
					agoods: agoods
				})
			})
		})
		
	}
	
}

exports.list = function(req, res) {
	res.send('尽请期待!')
}

