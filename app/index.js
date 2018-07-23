import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session);
import passport from 'passport';
import flash from 'connect-flash';
import {ENV, PORT, MONGO_URL} from './config.js';

mongoose.connect(MONGO_URL, {useNewUrlParser: true});
require(`./utils/passport`)(passport);

let app = express();

app.use(morgan(`dev`));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.set(`view engine`, `ejs`);

app.use(session({
    secret: `sometextstring`,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function(req, res, next) {
    console.log(req.session); // eslint-disable-line
    console.log(`===================`); // eslint-disable-line
    console.log(req.user); // eslint-disable-line
    next();
});

require(`./routes`)(app, passport);

app.listen(PORT, () => console.log(`App listening on port ` + PORT + ` in ` + ENV + ` mode!`)); // eslint-disable-line
