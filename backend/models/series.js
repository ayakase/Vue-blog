const axios = require("axios");
const PORT = process.env.PORT || 3000;
const Sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
const user = require("./users");
// const post = require("./post");
const sequelize = new Sequelize("api", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const series = sequelize.define("series", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  hash_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  slug: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  cannonical_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  moderation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  transliterated: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  contents: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  scheduled_publish_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  post: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
series.belongsTo(user, { foreignKey: "user_id", as: "author" });
user.hasMany(series, { foreignKey: "user_id" });
module.exports = series;
// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Model synced with database!");
//   })
//   .catch((err) => {
//     console.error("Error syncing model with database:", err);
//   });

// const fetchData = (post) => {
//   const url = `https://viblo.asia/api/series?page=${post}&limit=6`;
//   return new Promise((resolve, reject) => {
//     axios
//       .get(url)
//       .then((response) => {
//         let createSeries = [];
//         let dataArray = response.data.data;
//         dataArray.forEach((element) => {
//           // console.log(element.hash_id);
//           axios
//             .get(`https://viblo.asia/api/series/${element.hash_id}`)
//             .then((response) => {
//               let seriesDetail = response.data.series.data;
//               let postArray = [];
//               let seriesPost = response.data.posts.data;
//               seriesPost.forEach((element) => {
//                 postArray.push(element.id);
//               });
//               let tempObj = { post: JSON.stringify(postArray) };
//               console.log(tempObj);
//               let series = { ...seriesDetail, ...tempObj };
//               createSeries.push(series);
//             });
//         });
//         setTimeout(() => {
//           // console.log(createSeries);
//           resolve(createSeries);
//         }, 2000);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
// // fetchData(1);
// const insertData = (data) => {
//   return series
//     .bulkCreate(data, { ignoreDuplicates: true })
//     .then(() => {
//       console.log("Data inserted");
//     })
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
//   console.log(data);
// };
// const insertAndIncrement = async () => {
//   let post = 1;
//   let data = await fetchData(post);
//   while (data.length > 0) {
//     try {
//       await insertData(data);
//       post++;
//       data = await fetchData(post);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };
// insertAndIncrement();
