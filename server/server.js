if(process.env.NODE_ENV !="production"){
require('dotenv').config()
}
const express = require('express')
const connectToDb = require('./config/connectToDb')
const server = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const requireAuth = require('./middleware/requireAuth')
//connect to database
connectToDb();
const cors = require('cors')
//my middle ware 
server.use(bodyParser.urlencoded({extended:false}))
server.use(express.json());
server.use(cors({
    origin:true,
    credentials:true
}));
server.use(cookieParser())

server.use((req,res,next)=>{
    const {method,url} = req;
    console.log(`req for url ${url} and using method ${method}`);
    next();
})
server.use("/notes",require('./routeNotes'));
server.use("/users",require('./routeUsers'));
server.listen(process.env.PORT,()=>{
    console.log(`server opening with port 5656`);
})