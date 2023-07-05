const Sequelize = require("sequelize");
const user = require("../models/users");
const { Model, DataTypes } = require("sequelize");
const axios = require("axios");
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
    .bulkCreate(data, { ignoreDuplicates: false })
    .then(() => {
      console.log("Data inserted");
    })
    .catch((error) => {
      if (error.name === "SequelizeUniqueConstraintError") {
        console.error("Duplicate ID found. Stopping execution.");
        process.exit(1);
      } else {
        console.error(error);
        throw error;
      }
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
