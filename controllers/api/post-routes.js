const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Vote, Comment } = require('../../models');

//Gets all Users
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'description',
            'image',
            'location',
            'created_at',
            [sequelize.literal('SELECT COUNT(*) FROM vote WHERE post.id = vote.post.id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});






module.exports = router;