var Cake = require('../models/cake')
var Category = require('../models/category')
var _ = require('underscore')
var fs = require('fs')
var path = require('path')


//detail page
exports.detail = function(req, res) {
	var id = req.params.id
	Cake.update({_id: id}, {$inc: {pv: 1}}, function(err) {
		if (err) {
			console.log(err)
		} 
	})
	Cake.findById(id, function(err, cake) {
		res.render('detail', {
			title: cake.name + '详情',
			cake: cake
		})
	})
}

//admin page
exports.new = function(req, res) {
	Category.find({}, function(err, categories) {
		
		if (err) console.log(err)

		res.render('admin', {
			title: '后台录入页',
			cake: {},
			categories: categories
			
		})
	})
	
}

//admin update cake
exports.update = function(req, res) {
	var id = req.params.id

	if (id) {
		Cake.findById(id, function(err, cake) {
			Category.find({}, function(err, categories) {
				res.render('admin', {
					title: '后台更新',
					cake: cake,
					categories: categories
				})
			})
			
		})
	}
}


//admin post cake 
exports.save = function(req, res) {
    var cakeObj = req.body.cake;
    var id = cakeObj._id;
    var _cake;
    
    //图片上传
    /*if (req.poster) {
    	cakeObj.poster = req.poster
    }*/

    if (id) {
        Cake.findById(id, function (err, cake) {
            if (err) {
                console.log(err);
            }
            _cake = _.extend(cake, cakeObj);
            _cake.save(function (err, cake) {
                if (err) {
                    console.log(err);
                }
 
                res.redirect('/cake/' + cake._id);
            });
        }); 
    } else { 
        _cake = new Cake(cakeObj);

        var categoryId = cakeObj.category
        //var categoryName = cakeObj.categoryName
        _cake.save(function (err, cake) {
            if (err) {
                console.log(err);
            }
           
            if (typeof categoryId === 'string') {
            	Category.findById(categoryId, function(err, category) {

	            	category.cakes.push(_cake._id)

	            	category.save(function(err, category) {
	            		res.redirect('/cake/' + cake._id);
	            	})
	            })
            }
 
            if (typeof categoryId === 'object') {
            	for (var i=0; i<categoryId.length; i++) {
            		
            		Category.findById(categoryId[i], function(err, category) {

		            	category.cakes.push(_cake._id)

		            	category.save(function(err, category) {
		            		
		            	})
		            })
            	}
            	res.redirect('/cake/' + cake._id);
            	
            }

            //添加自定义分类项
            /*else if (categoryName) {
            	var category = new Category({
            		name: categoryName,
            		cakes: [cake._id]
            	})

            	category.save(function(err, category) {
            		cake.category = category._id
            		cake.save(function(err, cake) {
            			res.redirect('/cake/' + cake._id);
            		})
            		
            	})
            }*/
            
            
        });
    }
} 

//list page
exports.list = function(req, res) {
	Cake.fetch(function(err, cakes){
		if (err) {
			console.log(err)
		}
		
		res.render('list', {
		title: '列表页',
		cakes: cakes
	})
	})
	
}

//list delete cake
exports.del = function(req, res) {
	var id = req.query.id
	console.log("deleting ", id)
	if (id) {
		Cake.remove({_id: id}, function(err, cake){
			if(err) {
				console.log(err)
			}
			else {
				res.json({success: 1})
			}
		})
	}
}

