var mongoose = require('mongoose')
var DeliveinfoSchema = require('../schemas/deliveinfo')
var Deliveinfo = mongoose.model('Deliveinfo', DeliveinfoSchema)

module.exports = Deliveinfo;