const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const Sequelize = require("sequelize");
const post = require("./models/posts");
const user = require("./models/users");
const series = require("./models/series");
const tag = require("./models/tags");
const { Model, DataTypes } = require("sequelize");
const { Op } = require("sequelize");
// const update = require("./update/posts");
app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.get("/posts/:page", (req, res) => {
  post
    .findAndCountAll({
      order: [["published_at", "DESC"]],
      limit: 12,
      offset: (req.params.page - 1) * 12,
      include: {
        model: user,
        as: "author",
        attributes: ["name"],
      },
    })
    .then((result) => {
      const { count, rows } = result;
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/gettags/:page", (req, res) => {
  tag
    .findAndCountAll({
      order: [["posts_count", "DESC"]],
      limit: 30,
      offset: (req.params.page - 1) * 30,
    })
    .then((result) => {
      const { count, rows } = result;
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/getauthor/:page", (req, res) => {
  user
    .findAndCountAll({
      order: [["followers_count", "DESC"]],
      limit: 30,
      offset: (req.params.page - 1) * 30,
    })
    .then((result) => {
      const { count, rows } = result;
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/user/:id/:page", (req, res) => {
  post
    .findAndCountAll({
      where: {
        user_id: req.params.id,
      },
      order: [["published_at", "DESC"]],
      limit: 12,
      offset: (req.params.page - 1) * 12,
      include: {
        model: user,
        as: "author",
        attributes: ["name", "avatar", "username", "followers_count"],
      },
    })
    .then((result) => {
      const { count, rows } = result;
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/trending", (req, res) => {
  post
    .findAll({
      where: {
        trending: 1,
      },
      include: {
        model: user,
        as: "author",
        attributes: ["name"],
      },
      order: [["published_at", "DESC"]],
    })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/detail/:id", (req, res) => {
  let id = req.params.id;
  post.findOne({ where: { id: id } }).then((post) => {
    res.send(post.toJSON());
  });
});

app.get("/date/:date", (req, res) => {
  const date = new Date(req.params.date);
  const startOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const endOfDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );

  post
    .findAll({
      where: {
        published_at: {
          [Op.between]: [startOfDay, endOfDay],
        },
      },
      include: {
        model: user,
        as: "author",
        attributes: ["name"],
      },
    })
    .then((posts) => {
      res.send(posts);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/search/:text/:page", (req, res) => {
  post
    .findAndCountAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.like]: "%" + req.params.text + "%",
            },
          },
          {
            contents: {
              [Op.like]: "%" + req.params.text + "%",
            },
          },
        ],
      },
      limit: 12,
      offset: (req.params.page - 1) * 12,
      order: [["published_at", "DESC"]],
      include: {
        model: user,
        as: "author",
        attributes: ["name"],
      },
    })
    .then((result) => {
      const { count, rows } = result;
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/tags/:tag", (req, res) => {
  post
    .findAll({
      where: {
        tag: {
          [Op.like]: "%" + req.params.tag + "%",
        },
      },
      limit: 10,

      order: [["published_at", "DESC"]],
      include: {
        model: user,
        as: "author",
        attributes: ["name"],
      },
    })
    .then((posts) => {
      res.send(posts);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/tagpost/:name", (req, res) => {
  post
    .findAll({
      where: {
        tag: { [Op.like]: "%" + req.params.name + "%" },
      },
      order: [["published_at", "DESC"]],
      limit: 20,
      include: {
        model: user,
        as: "author",
        attributes: ["name", "avatar", "username", "followers_count"],
      },
    })
    .then((posts) => {
      res.send(posts);
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/livesearch/:term", (req, res) => {});
app.get("/allseries/:page", (req, res) => {
  series
    .findAndCountAll({
      order: [["published_at", "DESC"]],
      limit: 30,
      offset: (req.params.page - 1) * 30,
      include: {
        model: user,
        as: "author",
        attributes: ["name"],
      },
    })
    .then((result) => {
      const { count, rows } = result;
      res.send(result);
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/serieslist/:id/:page", (req, res) => {
  console.log(req.params.id);
  let page = req.params.page;
  series
    .findAll({
      where: {
        id: req.params.id,
      },
    })
    .then((series) => {
      let seriesID = JSON.parse(series[0].dataValues.post);
      console.log(series);
      post
        .findAndCountAll({
          where: {
            id: seriesID,
          },
          order: [["published_at", "DESC"]],
          limit: 12,
          offset: (page - 1) * 12,
          include: {
            model: user,
            as: "author",
            attributes: ["name", "avatar", "username", "followers_count"],
          },
        })
        .then((result) => {
          const { count, rows } = result;
          res.send(result);
        })
        .catch((error) => {
          console.error(error);
        });
    });
});
app.get("/seriespost/:id", (req, res) => {
  console.log(req.params.id);
  series
    .findAll({
      where: {
        post: { [Op.like]: "%" + req.params.id + "%" },
      },
    })
    .then((series) => {
      if (series.length > 0) {
        let posts = JSON.parse(series[0].dataValues.post);
        post
          .findAll({
            where: {
              id: {
                [Op.in]: posts,
              },
            },
            include: {
              model: user,
              as: "author",
              attributes: ["name", "avatar", "username", "followers_count"],
            },
          })
          .then((posts) => {
            res.send(posts);
          });
      } else {
        res.send("");
      }
    });
});
app.use(express.static("server"));
app.listen(PORT, function () {
  console.log(`Server is running on localhost:${PORT}`);
});
