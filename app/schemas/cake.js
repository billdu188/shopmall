var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CakeSchema = new Schema({
	name: String,
	num: {
		type: Number,
		default: 1
	},
	price: [Number],
	poster: String,
	detail_main: String,
	detail_img1: String,
	detail_img2: String,
	shopcar_img: String,
	intro: String,
	material: String,
	pv: {
		type: Number,
		default: 0
	},
	category: [{
		type: ObjectId,
		ref: 'catetory'
	}],
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

CakeSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else {
		this.meta.updateAt = Date.now()
	}

	next()
})

CakeSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			
			.exec(cb)
	}
}

module.exports = CakeSchema