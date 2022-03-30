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

User.belongsToMany(Post, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "post_id"
});


Post.belongsToMany(User, {
    foreignKey: "user_id"
});
Post.belongsToMany(User, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "user_id"
});

Post.hasMany(Vote, {
    foreignKey: "post_id"
});

Post.hasMany(Comemnt, {
    foreignKey: "post_id"
});

Comment.belongToUser(Comment, {
    foreignKey: "user_id"
});



module.exports = { User, Post, Comment, Vote };
