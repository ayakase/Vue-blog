const axios = require("axios");
const PORT = process.env.PORT || 3000;
const Sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize("api", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const tag = sequelize.define("tag", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true,
    primaryKey: true,
  },
  slug: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  posts_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  followers_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});
module.exports = tag;

// sequelize
//   .sync({ force: true })
//   .then(() => {
//     console.log("Model synced with database!");
//   })
//   .catch((err) => {
//     console.error("Error syncing model with database:", err);
//   });

// const fetchData = (page) => {
//   const url = `https://viblo.asia/api/tags?page=${page}`;
//   return new Promise((resolve, reject) => {
//     axios
//       .get(url)
//       .then((response) => {
//         setTimeout(() => {
//           resolve(response.data.data);
//         }, 500);
//         // console.log(response.data.data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
// const insertData = (data) => {
//   return tag
//     .bulkCreate(data, { ignoreDuplicates: true })
//     .then(() => {
//       console.log("Data inserted");
//     })
//     .catch((error) => {
//       console.error(error);
//       throw error;
//     });
// };
// const insertAndIncrement = async () => {
//   let page = 1;
//   let data = await fetchData(page);
//   while (data.length > 0) {
//     try {
//       await insertData(data);
//       console.log(page);
//       page++;
//       data = await fetchData(page);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };
// insertAndIncrement();
