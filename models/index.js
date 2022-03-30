const User = require("./User");
const Post = require("./Post");
const Comment= require("./Comment");
const Vote = require("./Vote");

User.hasMany(Post, {
    foreignKey: "user_id"
});
User.hasMany(Comment, {
    foreignKey: "user_id"
});
User.hasMany(Vote, {
    foreignKey: "user_id"
});

module.exports = { User, Post, Comment, Vote };
