const express = require('express')
const router = express.Router();
const utils = require('./utils')
let uid =1;



router.route("/").get((req,res)=>{
    const users = utils.getUsers()
    console.log(users);
    res.json(users)
})

router.route('/').post((req,res)=>{
    const {name,email,password} = req.body;
    if(name && email && password){
        let users = utils.getUsers();
        let uid = users.length + 1; // Initialize uid with length of users array + 1
        const user = {id:uid++,name,email,password}; // Increment uid for each new user added
        const userExists = users.find(user => user.email === email);
        if (userExists) {
            res.status(409).json({ message: 'User with the provided email already exists'});
        } else {
            users.push(user);
            utils.addUsers(users);
            res.status(201).json(users)
        }
    }else{
        res.status(400).json({ message: 'User, email, and password are required'});
    }
})




module.exports =router;