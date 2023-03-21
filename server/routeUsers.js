const express = require('express')
const router = express.Router();
const utils = require('./utils')

const { v4: uuidv4 } = require("uuid");


router.route("/").get((req,res)=>{
    const users = utils.getUsers()
    console.log(users);
    res.json(users)
})

router.route('/').post((req,res)=>{
    const {name,email,password} = req.body;
    if(name && email && password){
        let uid =uuidv4();
        let users = utils.getUsers();
        const user = {id:uid,name,email,password};
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

router.route('/:id').delete((req,res)=>{
    const id = String(req.params.id);
    let users = utils.getUsers();
    const userIndex = users.findIndex(user=>user.id===id);
    if(userIndex!==-1){
        users.splice(userIndex,1);
        utils.addUsers(users);
        res.json(users);
    }else{
        res.status(404).json({ message: `User with id ${id} not found`});
    }
})


module.exports =router;