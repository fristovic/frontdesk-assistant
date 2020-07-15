//["2b2d42","8d99ae","edf2f4","ef233c","d90429"]
//packages
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const { render } = require('ejs')
const cookieParser = require('cookie-parser')
const { Report, User } = require('./models/models')
const controler = require('./controlers/controlers')

//MongoDB -- Note: Not listening unless DB is connected (Failsafe)
const dbURI = process.env.MONGO_URI
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err))

//express and middleware
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))

//JWT token middleware
//authentication
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token || '';
    try {
        if (!token) {
          return res.status(401).render('errors/401.ejs')
        }
        const user = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = user
        next();
    } catch (err) {
        return res.status(500).json(err.toString());
    }
}

//authorization
const verifyAdmin = (req, res, next) => {
    if (!req.user.admin) {
        res.status(403).render('errors/403.ejs')
    }
    next()
}

//view engine
app.set('view engine', 'ejs')

//Login Page - Note: Logsout users by deleting cookie with JWT
app.get('/', (req, res) => {
    res.clearCookie("token")
    res.render('index') 
})

app.post('/', controler.user_login)

//----------------------USER ROUTES--------------------------
app.get('/user', verifyToken, controler.user_reports)

app.get('/user/createreport', verifyToken, (req, res) => {
    res.render('createReport', {admin: req.user.admin})
})

app.post('/user/createreport', verifyToken, controler.create_report)

//----------------------ADMIN ROUTES--------------------------
app.get('/admin', verifyToken, verifyAdmin, controler.all_reports)

app.get('/admin/:id', verifyToken, verifyAdmin, controler.report_details)

app.delete('/admin/:id', verifyToken, verifyAdmin, controler.delete_report)

app.get('/createuser', verifyToken, verifyAdmin, (req, res) => {
    res.render("createUser", {admin: req.user.admin}) 
})

app.post('/createuser', verifyToken, verifyAdmin, controler.create_user)

//404 page
app.use((req, res) => {
    res.status(404).render('errors/404.ejs', { title: '404' });
  })
