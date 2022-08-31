const express = require("express");
const { Sequelize } = require('sequelize');
const app = express();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const {config} = require("./config");
const {User, addUser, deletebyUsername} = require("./Models/UserModel")
const userRouter = require("./Router/UserRouter");
app.use('/user',userRouter);
app.use(express.json());

const sequelize = new Sequelize('userdb', 'host', 'Password1', {
  host: 'localhost',
  port: 3306,
  dialect:'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});



app.delete("/user/delete", async (req, res) => {
  username = req.body.username;
  await deletebyUsername(username);
  return res.status(200).send(username+" deleted successfully deleted")
})


app.listen(3000);
