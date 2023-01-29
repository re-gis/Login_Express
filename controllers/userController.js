const connect = require('../config/db')
const mysql = require('mysql')


const getUsers = (req, res) => {
    
        // Get user from the db
    
        let sql = 'SELECT * FROM users'
        connect.query(sql, (err, data) => {
            if(err) {
                console.log(err);
            } else {
                res.json({users: data})
                // res.render('index')
            }
        })
    
    
    
}


const signUser = (req, res) => {
    res.render('index')
    
    const uname = req.body.uname
    res.send(uname)
    console.log(uname);
    
    
}


const updateUser = (req, res) => {
    
        // Get specified user
        let sql3 = `SELECT * FROM users WHERE user_id = user_id`
        connect.query(sql3, (err) => {
            if(err) {
                console.log(err);
            } else {
                res.json({updated_user: `${req.params.id} updated`})
            }
        })
    
    
}


const deleteUser = (req, res) => {
    
        // Get the user from the db
        let sql4 = `SELECT * FROM users WHERE user_id = user_id`
        connect.query(sql4, (err) => {
            if(err) {
                console.log(err);
            } else {
                res.json({updated_user: `${req.params.id} deleted`})
            }
        })
    
    
}


module.exports = {
    getUsers,
    signUser,
    updateUser,
    deleteUser,
}