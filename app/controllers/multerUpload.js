var multer = require('multer')
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './public/upload/')
	},
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split('.')
		cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length-1])
	}
})
var upload = multer({storage: storage}).single('uploadPoster')

//admin poster
exports.savePoster = function(req, res, next) {
	upload(req, res, function(err) {
		if (err) {
			console.log(err)
		}
		
	})
	
    
next()
}