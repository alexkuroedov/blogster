const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const hbars = require('express-handlebars')
//express 4.16 ?? not needed?
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const config = require('./config/config')

const { truncate,
        stripTags,
        formatDate,
        select,
        editIcon} = require('./helpers/hbs')


const app = express()
const port = process.env.PORT || 5000


mongoose.connect(config.mongoURI, {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDb connected,', config.mongoURI ))
    .catch(err => console.log('MongoDb connect error',err))

//load user model
require('./models/User')

//passport config
require('./config/passport')(passport);


//============ middleware ===========
//handlebars middleware
app.engine(
    "handlebars",
    hbars({
        helpers:{
            truncate,
            stripTags,
            formatDate,
            select,
            editIcon
        },
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

//body parser middleware (for form create req.body)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride("_method"));

//express >= 4.16 native functions
// app.use(express.json())
// app.use(express.urlencoded({extended: false}))

//static folder
app.use(express.static(path.join(__dirname, "public")));


//express session midleware
app.use(
    session({
        secret: "secret 3930s9__8738_",
        resave: true,
        saveUninitialized: true
    })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//the flash is a special area of the session used for storing messages
app.use(flash());

//global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user || null;
    next();
});

//============ routing ===============
//load routes
const auth = require('./routes/auth')
const index = require('./routes/index')
const stories = require('./routes/stories')

app.use('/', index)
app.use('/auth', auth)
app.use('/stories', stories)


app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})

//============ end routing ===============

//for Heroku not sleep
const https = require("https");
const http = require("http");
setInterval(function() {
    https.get("https://nameless-meadow-22669.herokuapp.com/", (result) => {
        console.log('get https ',result)
    });

    http.get("http://mysterious-lake-60427.herokuapp.com/", (result)=> {
        console.log('get http ', result)
    })
}, 300000); // every 5 minutes (300000)
