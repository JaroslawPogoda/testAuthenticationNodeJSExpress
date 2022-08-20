const express = require("express");
const { Sequelize } = require('sequelize');
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const {config} = require("./config");
const {User, addUser, deletebyUsername} = require("./Models/UserModel")
app.use(express.json());
const posts = [
  {
    username: "kyle",
    title: "Post 1",
  },
  {
    username: "jim",
    title: "Post 2",
  },
];



const sequelize = new Sequelize('userdb', 'host', 'Password1', {
  host: 'localhost',
  port: 3306,
  dialect:'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});
const users = [
  {
    username: "kyle",
    posts: "Post 1",
  },
];
app.get("/posts", (req, res) => {

  res.json(posts);
});
app.get("/users", async(req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  res.json(users);
});
app.post("/user/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { username: req.body.username, password: hashedPassword, fname: req.body.fname,lname: req.body.lname,email: req.body.email};
    users.push(user);
    addUser(user);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ 
        error:"the error has occured",
    })
  }
});
app.delete("/user/delete", async (req, res) => {
  username = req.body.username;
  await deletebyUsername(username);
  return res.status(200).send(username+" deleted successfully deleted")
})

app.post("/user/login", async (req, res) => {
    const user = users.find(user => user.username == req.body.username);
    console.log(user);
    if(user == null){
       return res.status(400).send('user does not exist')
    }
    try {
        if(await bcrypt.compare(req.body.password,user.password)){
            res.status(200).json({
                success: true, 
                user,
            })    
        }else {
            res.status(200).json({
                success:false,
                user:null,
             })
        }
    }
    catch{
        res.status(500).json({
            message:"error has occured",
            
        })
    }
})
app.listen(3000);
