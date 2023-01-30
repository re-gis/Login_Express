const connect = require('../config/db')
const mysql = require('mysql')
const emailValidator = require('deep-email-validator')




    // Signup Page 
 const signPage = (req, res) => {
        res.render('index')
           
    }

 
 
 
    // Sign up user
const signUser = (req, res) => {
    let name = req.body.uname
    let email = req.body.email
    let pass = req.body.password
    let pic = req.body.pic

    if(!name || !email || !pass) {
        res.send('Input all credentials!')
    } else {
        let sql = `INSERT INTO users (name, picture, password, email) VALUES ('${name}', '${pic}', '${pass}', '${email}');`
        connect.query(sql, (err) => {
            if(err) {
                console.log(err);
            } else {
                res.render('dash')
            }
        })
    }
    

}

    // Login Page

    const loginPage = (req, res) => {
        res.render('login')
    }

    // Login user

const loginUser = (req, res) => {
    let loginEmail = req.body.email
    let loginPass = req.body.pass
    let sql = `SELECT * FROM users where email='${loginEmail}'`
    connect.query(sql, (err, data) => {
        if(err) {
            console.log(err);
        } else {
            if(data.length == 0 || !loginEmail){
                res.send('No user available')
            } else {
                res.render('dash')
                console.log(data.length);
            //    console.log(data);
            }
        } 
    })
    
}


    // Update the user
const updateUser = (req, res) => {
    
        
    
    
}


    // Delete the user
const deleteUser = (req, res) => {
    
        
    
    
}

const login = (req, res) => {
    res.render('dash')
}


module.exports = {
    signPage,
    signUser,
    updateUser,
    deleteUser,
    loginUser,
    loginPage,
    login
}