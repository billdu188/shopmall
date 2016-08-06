var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var expressSession = require('express-session')
var mongoStore = require('connect-mongo')(expressSession)
var mongoose = require('mongoose')
var morgan = require('morgan')
var port = process.env.PORT || 3000
var app = express()
var dbUrl = 'mongodb://dubq:7758258@ds145315.mlab.com:45315/minishop'

app.use(express.static(path.join(__dirname, '/public')))
mongoose.connect(dbUrl)
app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded({extended: true }))
app.use(cookieParser())
app.use(expressSession({
	secret: 'minishop',
	store: new mongoStore({ 
		url: dbUrl,
		collection: 'sessions',
	
	}),
	resave: true,
	saveUninitialized: false
}))

app.locals.moment = require('moment')
app.listen(port)
console.log('minishop started on port ' + port)

if ('development' === app.get('env')) {
	app.set('showStackError', true)
	app.use(morgan(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug', true)
} 
 
require('./config/routes')(app)
