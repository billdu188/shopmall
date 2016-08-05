var mongoose = require('mongoose')
var CakeSchema = require('../schemas/cake')
var Cake = mongoose.model('Cake', CakeSchema)

module.exports = Cake

