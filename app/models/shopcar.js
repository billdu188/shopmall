var mongoose = require('mongoose')
var ShopcarSchema = require('../schemas/shopcar')
var Shopcar = mongoose.model('Shopcar', ShopcarSchema)

module.exports = Shopcar
