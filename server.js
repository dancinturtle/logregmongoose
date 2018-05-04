
const express = require('express');
const flash = require('express-flash');
const path = require('path');
const app = express();
// const cookieParser = require('cookie-parser');
const session = require('express-session');
// const sessionStore = new session.MemoryStore;
// const cookieParser = require('cookie-parser');
// app.use(cookieParser('squiddypie'));
app.use(session({
    secret: 'twinkletwinklelittlestarhowiwonderaboutyourplasma',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))
app.use(flash());
// app.use(function(req, res, next){
// 	res.locals.sessionFlash = req.session.sessionFlash;
// 	delete req.session.sessionFlash;
// 	next();
// })
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, './client/static')));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
require('./server/config/mongoose.js');
const routes = require('./server/config/routes.js');
routes(app);

app.listen(8000, function(){
	console.log("listening on port 8000");
});
