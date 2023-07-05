const Sequelize = require("sequelize");
const post = require("../models/posts");
const { Model, DataTypes } = require("sequelize");
const axios = require("axios");

const fetchData = (page) => {
  const url = `https://viblo.asia/api/posts/newest?page=${page}&limit=1`;
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        let postArray = [];
        let allPost = response.data.data;
        let eachPost;
        allPost.forEach((element) => {
          eachPost = element;
          let tagObject = element.tags.data;
          let tagArray = [];
          tagObject.forEach((element) => {
            tagArray.push(element.name);
          });
          let tempObj = { tag: JSON.stringify(tagArray) };
          let createPost = { ...eachPost, ...tempObj };
          postArray.push(createPost);
        });
        setTimeout(() => {
          resolve(postArray);
        }, 2000);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
const insertData = (data) => {
  return post
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
  let page = 1;
  let data = await fetchData(page);
  while (data.length > 0) {
    try {
      await insertData(data);
      page++;
      data = await fetchData(page);
    } catch (error) {
      console.error(error);
    }
  }
};
insertAndIncrement();
