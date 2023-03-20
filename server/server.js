const express = require('express')
const server = express();
const bodyParser = require('body-parser')
const cors = require('cors')
//my middle ware 
// server.use(bodyParser.urlencoded({extended:false}))
server.use(express.json());
// server.use(cors());
// server.use((req,res,next)=>{
//     const {method,url} = req;
//     console.log(`req for url ${url} and using method ${method}`);
//     next();
// // })
server.use("/users",require('./routeUsers'));


server.listen(5656,()=>{
    console.log(`server opening with port 5656`);
})