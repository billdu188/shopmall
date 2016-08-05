var Index = require('../app/controllers/index')
var Cake = require('../app/controllers/cake')
var User = require('../app/controllers/user')
var Shopcar = require('../app/controllers/shopcar')
var Deliveinfo = require('../app/controllers/deliveinfo')
var Order = require('../app/controllers/order')
var Midw = require('../app/controllers/midware')
var Category = require('../app/controllers/category')
var MulterUpload = require('../app/controllers/multerUpload')

module.exports = function (app) {
	//预处理  
	app.use(function(req, res, next) {
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	})

	//Index
	app.get('/', Index.index)
	app.post('/test',MulterUpload.savePoster, Index.index)
   
	//User
	app.post('/user/signup', User.signup) 
	app.post('/user/signin', User.signin)
	app.get('/signin', User.showSignin)
	app.get('/signup', User.showSignup)
	app.get('/logout', User.logout) 
	app.get('/admin/user/list', Midw.signinRequired, Midw.adminRequired, User.list)
	
	//Cake
	app.get('/cake/:id', Cake.detail)
	app.get('/admin/cake', Midw.signinRequired, Midw.adminRequired, Cake.new)
	app.get('/admin/cake/update/:id', Midw.signinRequired, Midw.adminRequired, Cake.update)
	app.post('/admin/cake/new', Midw.signinRequired, Midw.adminRequired, Cake.save)
	app.get('/admin/cake/list', Midw.signinRequired, Midw.adminRequired, Cake.list)
	app.delete('/admin/cake/list',  Cake.del)
	
 
	//category
	app.get('/admin/category/new', Midw.signinRequired, Midw.adminRequired, Category.new)
	app.post('/admin/category', Midw.signinRequired, Midw.adminRequired, Category.save)
	app.get('/admin/category/list', Midw.signinRequired, Midw.adminRequired, Category.list)

	//search
	app.get('/results', Index.search) 
 
	//shopcar /Shopcar.list
	app.get('/shopcar', Shopcar.list) 
	app.post('/shopcar', Shopcar.add)
	app.delete('/shopcar/list', Shopcar.del) 
	app.post('/shopcar/list/plus', Shopcar.plus)
	app.post('/shopcar/list/minus', Shopcar.minus)
	
	//deliveinfo
	app.post('/deliveinfo',Deliveinfo.save)
	app.delete('/deliveinfo/del', Deliveinfo.del)
	//order
	app.get('/order', Order.detail)
	app.get('/order/list', Order.list)
}