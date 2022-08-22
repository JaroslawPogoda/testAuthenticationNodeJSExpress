const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const config = require('../config');

const configure = require('dotenv');
router.use(express.json);
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const userdb = process.env.DB_DATABASE;
const sequelize = new Sequelize(userdb, username, password, {
    host: host,
    port: port,
    dialect:'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });
router.post('/register', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = { username: req.body.username, password: hashedPassword, fname: req.body.fname,lname: req.body.lname,email: req.body.email};
    users.push(user);
    addUser(user);
    res.status(201).send();
  }
  catch{
    res.status(500).send("server Error")
  }
})
router.put('/', async(req, res)=>{

})
module.exports= router