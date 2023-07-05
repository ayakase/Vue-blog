const express = require("express");
const app = express();
const Sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
// const post = require("./posts");
let axios = require("axios");
const sequelize = new Sequelize("api", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

app.use(express.static("server"));
const user = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  followers_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  reputation: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  posts_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  banned_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  level_partner: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  following: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});
module.exports = user;

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Model synced with database!");
//   })
//   .catch((err) => {
//     console.error("Error syncing model with database:", err);
//   });

const fetchData = (post) => {
  const url = `https://viblo.asia/api/posts/newest?page=${post}&limit=50`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        let userId = response.data.data.map((user) => user.user.data);
        resolve(userId);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const insertData = (data) => {
  return user
    .bulkCreate(data, { ignoreDuplicates: true })
    .then(() => {
      console.log("Data inserted");
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};
const insertAndIncrement = async () => {
  let post = 1;
  let data = await fetchData(post);
  while (data.length > 0) {
    try {
      await insertData(data);
      post++;
      data = await fetchData(post);
    } catch (error) {
      console.error(error);
    }
  }
};
insertAndIncrement();

