const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("userdb", "host", "Password1", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
});
const User = sequelize.define(
  "User",
  {
    idUsers: {
      type: "integer",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    tableName: "users",
  }
);
const addUser = async (user) => {
  const newUser = await User.build({
    username: user.username,
    password: user.password,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
  });
  await newUser.save();
};
const deletebyUsername = async (username)=>{
    User.destroy({where: {username: username}})
}
const findByUsername = async (username)=>{
  User.findOne({where: {username: username}})
}
module.exports = { User,findByUsername, addUser, deletebyUsername};
