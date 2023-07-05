const Sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
const user = require("./users");

const sequelize = new Sequelize("api", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const post = sequelize.define("post", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  slug: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url: {
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
  contents_short: {
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
  is_published: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_shared: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  edited_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  translation_source: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  trend_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  promoted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  reading_time: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  views_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  clips_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  comments_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  rated_value: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  promoted: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  trending: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_draft: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  locale_code: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  is_video: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  thumbnail_url: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  user: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  tag: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  commentators: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});
post.belongsTo(user, { foreignKey: "user_id", as: "author" });
user.hasMany(post, { foreignKey: "user_id" });
module.exports = post;

