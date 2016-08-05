var mongoose = require('mongoose');
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var OrderSchema = new Schema({
	ordernum:Number,
	user: {type: ObjectId,ref: 'user'},
	goods: {type:ObjectId, ref:"Shopcar"},
	payment: String,
	coupon: {type:Number,default:0},
	totalValue:{type:Number,default:0},
	status: String,
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

OrderSchema.pre('save', function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else {
		this.meta.updateAt = Date.now()
	}

	next()
})

OrderSchema.statics = {
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

module.exports = OrderSchema