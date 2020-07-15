const { Report, User } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const user_login = async (req, res) => {
    const user = await User.findOne({username: req.body.username})
        .then(result => result)
        .catch(err => {console.log(err)})
    if (user == null) {
        return res.status(400).render('errors/400.ejs')
    }
    
    try {
        if(await bcrypt.compare(req.body.password, user.password)){

            const cookieToken = jwt.sign(user.toJSON(), process.env.TOKEN_SECRET)
            res.cookie("token", cookieToken, {httpOnly: true})

            if(user.admin){
                res.redirect("/admin")
            } else {
                res.redirect("/user")
            }
        } else {
            res.status(400).render('errors/400.ejs')
        }
    } catch {
        res.status(500);
    }
}

//User Controls
const user_reports = (req, res) => {
    Report.find({ createdBy: req.user.username }).sort({ createdAt: -1 })
        .then((result) => {
            res.render('user', { title: "User Reports", reports: result, admin: req.user.admin })
        })
        .catch((err) => {
            console.log(err)
        })
}

const create_report = (req, res) => {
    const report = new Report({
        reportType: req.body.reportType,
        description: req.body.description,
        createdBy: req.user.username,
        roomNumber: req.user.room
    });
    report.save()
        .then((result) =>{
            res.redirect('/user')
        })
        .catch((err) => {
            console.log(err)
        })
}

//Admin Controls
const all_reports = (req, res) => {
    Report.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('admin', { title: "All Reports", reports: result, admin: req.user.admin })
        })
        .catch((err) => {
            console.log(err)
        })
}

const report_details = (req, res) => {
    const id = req.params.id;
    Report.findById(id)
        .then(result => {
            res.render("report", { report: result, title: "Report Details", admin: req.user.admin })
        })
        .catch(err => {res.status(404).render('errors/404.ejs', { title: 'Report not found' })})
}

const delete_report = (req, res) => {
    const id = req.params.id
    Report.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: "/admin" })
        })
        .catch(err => { console.log(err) })
}

const create_user = async (req, res) => {
    try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        admin: req.body.admin,
        username: req.body.username,
        password: hashedPassword,
        room: req.body.room
    })
    user.save()
    res.redirect('/')
    } catch {
        res.status(500).send()
    }
}


module.exports = {
    user_login,
    user_reports,
    create_report,
    all_reports,
    report_details,
    delete_report,
    create_user
}