const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const ToughtController = require('./controllers/ToughtController')
const port = 3000
const app = express()

const connex = require('./db/connex')
//models
const Tought = require('./models/Thought')
const User = require('./models/User')
//import routes
const toughtsRoutes = require('./routes/toughtsRoutes')
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())

//sessions middleware
app.use(session({
    name: 'session',
    secret: 'my_secret',
    resave: false,
    store: new FileStore({
        logFn: function(){},
        path: require('path').join(require('os').tmpdir(),'session'),
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true,
    }
}),
)

//flash messages
app.use(flash())

//set session to res
app.use((req,res,next)=>{
    if(req.session.useid){
        res.locals.session = req.session
    }
    next()
})
//ROUTES
app.use('/toughts', toughtsRoutes)
app.get('/', ToughtController.showToughts)

connex.sync().then(()=>{
    app.listen(port, console.log(`Rodando! porta: ${port}`))
}).catch((e)=>console.log(e))

