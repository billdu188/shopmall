var Category = require('../models/category')


//admin page
exports.new = function(req, res) {
	res.render('category_admin', {
		title: '后台分类录入页',
		category: {}
	})
}
exports.save = function(req, res) {
	var _category = req.body.category
	var category = new Category(_category)

	category.save(function(err, category) {
		if (err) console.log(err)

		res.redirect('/admin/category/list')
	})
}
//userlist page
exports.list = function(req, res) {
	Category.fetch(function(err, categories){
		if (err) {
			console.log(err)
		}
		
		res.render('categorylist', {
			title: '分类列表页',
			categories: categories
		})
	})
}




