var Cake = require('../models/cake')
var Category = require('../models/category')
var Shopcar = require('../models/shopcar')
//index page
exports.index = function(req, res) {
	var _user = req.session.user;
	Category
		.find({})
		.populate({path: 'cakes', options: {limit: 5}})
		.exec(function (err, categories) {
			if (err) {
			console.log(err)
			}
 			if(_user) {
				var _userId = _user._id;
				Shopcar.findOne({user:_userId}, function(err, shop){
					if (err) console.log(err);

					if (!shop) {
						shop = new Shopcar({'user': _userId});
						shop.save();
					}
					res.render('index', {
						title: '首页',
						categories: categories,
						shop: shop
					})
					
				})
				
			}else{
				res.render('index', {
					title: '首页',
					categories: categories
				})
			}
		})
}

//search page
exports.search = function(req, res) {
	var catId = req.query.cat
	var q = req.query.q
	var page = parseInt(req.query.p, 10) || 0
	var count = 2
	var index = page * count

	if (catId) {
		Category
			.find({_id: catId})
			.populate({path: 'cakes'})
			.exec(function (err, categories) {
				if (err) {
					console.log(err)
				}

				var category = categories[0] || {}
				var cakes = category.cakes || []
				var results = cakes.slice(index, index + count)

				res.render('results', {
					title: '结果列表',
					keyword: category.name,
					currentPage: (page + 1),
					query: 'cat=' + catId,
					totalPage: Math.ceil(cakes.length / count),
					cakes: results
				})
			})
	}
	else {
		Cake
			.find({name: new RegExp(q+'.*', 'ig')})
			.exec(function (err, cakes) {
				if (err) {
				console.log(err)
				}

				var results = cakes.slice(index, index + count)

				res.render('results', {
					title: '结果列表',
					keyword: q,
					currentPage: (page + 1),
					query: 'q=' + catId,
					totalPage: Math.ceil(cakes.length / count),
					cakes: results
				})
			})
	}
	
}