var Shopcar = require('../models/shopcar');
var Cake = require('../models/cake');


exports.list = function(req, res) { 
	var _user = req.session.user;
	
	if (_user) {
		var _userId = _user._id;
		Shopcar.findOne({user:_userId}, function(err, shop){
			if (err) console.log(err);
			
			res.render('shopcar', {
				title: '购物车',
				shop: shop
			})

		})
	}
	else {
		res.redirect('/signin')
	}

};
 
//add goods
exports.add = function(req, res) {
	var _user = req.session.user;
	var cakeId = req.body.cakeId;
	
	if(_user) {
		var userId = _user._id;
		Shopcar.findOne({user:userId}, function(err, shop) {
			if (err) {
				console.log(err)
			}
			Cake.findById(cakeId, function(err, caked) {
				if (err) {
					console.log(err)
				}
				if (shop.cake.id(cakeId) == undefined) {
					shop.cake.push(caked);
				}
				else{
					shop.cake.id(cakeId).num++;
				}
				shop.sumGoods++;
				shop.sumValue = 0;
				for(var i=0; i<shop.cake.length;i++) {
					shop.sumValue += shop.cake[i].price*shop.cake[i].num;
				}
				shop.save(function(err){
					if (err) {
						console.log(err)
					}
					_user.sumGoods = shop.sumGoods;
					_user.sumValue = shop.sumValue;
					res.json({
						success : 1,
						sumGoods : shop.sumGoods,
						sumValue : shop.sumValue
					})
				})
			})
		})
	}
}
 
exports.del= function(req, res) {
	var _user = req.session.user;
	var cakeId = req.body.cakeId;
	
	if(_user) {
		var userId = _user._id;
		Shopcar.findOne({user:userId}, function(err, shop) {
			if (err) {
				console.log(err)
			}
			shop.cake.id(cakeId).remove();
			shop.sumGoods -= shop.cake.id(cakeId).num;
			shop.sumValue = 0;
			for(var i=0; i<shop.cake.length;i++) {
				shop.sumValue += shop.cake[i].price*shop.cake[i].num;
			}
			shop.save(function(err){
				if (err) {
					console.log(err)
				}
				_user.sumGoods = shop.sumGoods;
				_user.sumValue = shop.sumValue;
				res.json({
					success : 1,
					sumGoods : shop.sumGoods,
					sumValue : shop.sumValue
				})
			})
			
		})
	}
} 

//plus goods
exports.plus = function(req, res) {
	var _user = req.session.user;
	var userId = _user._id;
	var cakeId = req.body.cakeId;

	Shopcar.findOne({user:userId}, function(err, shop) {
		if (err) {
			console.log(err)
		}
		shop.cake.id(cakeId).num++;
		shop.sumGoods++;
		shop.sumValue = 0;
		for(var i=0; i<shop.cake.length;i++) {
			shop.sumValue += shop.cake[i].price*shop.cake[i].num;
		}
		shop.save(function(err){
			if (err) {
				console.log(err)
			}
			_user.sumGoods = shop.sumGoods;
			_user.sumValue = shop.sumValue;
			res.json({
				success : 1,
				sumGoods : shop.sumGoods,
				oneValue : shop.cake.id(cakeId).price*shop.cake.id(cakeId).num,
				sumValue : shop.sumValue
			})
		})
	})
}
 
//minus goods
exports.minus = function(req, res) {
	var _user = req.session.user;
	var userId = _user._id;
	var cakeId = req.body.cakeId;

	Shopcar.findOne({user:userId}, function(err, shop) {
		if (err) {
			console.log(err)
		}
		shop.cake.id(cakeId).num--;
		shop.sumGoods--;
		shop.sumValue = 0;
		for(var i=0; i<shop.cake.length;i++) {
			shop.sumValue += shop.cake[i].price*shop.cake[i].num;
		}
		shop.save(function(err){
			if (err) {
				console.log(err)
			}
			_user.sumGoods = shop.sumGoods;
			_user.sumValue = shop.sumValue;
			res.json({
				success : 1,
				sumGoods : shop.sumGoods,
				oneValue : shop.cake.id(cakeId).price*shop.cake.id(cakeId).num,
				sumValue : shop.sumValue
			})
		})
	})
}