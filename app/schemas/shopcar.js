var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var CakeSchema = require('./cake')

var ShopcarSchema = new Schema({
	cake: [CakeSchema],
	user: {
		type: ObjectId,
		ref: 'User'
	},
	sumGoods: {type:Number, default:0},
	sumValue: {type:Number, default:0},
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
 
ShopcarSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else {
		this.meta.updateAt = Date.now()
	}

	next()
})

ShopcarSchema.statics = {
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

module.exports = ShopcarSchema