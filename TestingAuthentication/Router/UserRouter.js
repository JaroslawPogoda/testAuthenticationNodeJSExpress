const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const config = require("../config");
const configure = require("dotenv");
const {User, findByUsername, addUser, deletebyUsername} = require("../Models/UserModel")

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const userdb = process.env.DB_DATABASE;
const sequelize = new Sequelize(userdb, username, password, {
  host: host,
  port: port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});
router.use(express.json());
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = {
      username: req.body.username.toLowerCase(),
      password: hashedPassword,
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
    };
    addUser(user);
    res.status(201).send();
  } catch (err){
    console.log(err)
    res.status(500).send({message:"server Error", err});
  }
});
router.delete("/delete", async (req, res) => {
  let username = req.body.username;
  await deletebyUsername(username);
  return res.status(200).send(username+" deleted successfully deleted")
})
router.post("/login", async (req, res) => {
  const user = await findByUsername(req.body.username.toLowerCase()); //uers.find(user => user.username == req.body.username);
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
  catch(err){
      console.log(err);
      res.status(500).json({
          message:"error has occured",
          
      })
  }
})
router.put("/", async (req, res) => {});
module.exports = router;
