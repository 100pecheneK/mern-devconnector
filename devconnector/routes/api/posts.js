const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')

/** @route   POST /api/posts
 *  @desc    Create a post
 *  @access  Private
 */
router.post(
    '/',
    [
        auth,
        [
            check('text', 'Текст обязательный').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()})
        }
        try {
            const user = await User.findById(req.user.id).select('-password')

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            })

            const post = await newPost.save()

            return res.json(post)
        } catch (e) {
            console.error(e.message)
            return res.status().send('Ошибка сервера')
        }
    }
)

/** @route   GET /api/posts
 *  @desc    Get all posts
 *  @access  Private
 */
router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            const posts = await Post.find().sort({date: -1})
            return res.json(posts)
        } catch (e) {
            console.error(e.message)
            return res.status().send('Ошибка сервера')
        }
    }
)

/** @route   GET /api/posts/:id
 *  @desc    Get post by id
 *  @access  Private
 */
router.get(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (!post) {
                return res.status(404).json({msg: 'Пост не найден'})
            }

            return res.json(post)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(404).json({msg: 'Пост не найден'})
            }
            return res.status().send('Ошибка сервера')
        }
    }
)

/** @route   DELETE /api/posts/:id
 *  @desc    Delete post by id
 *  @access  Private
 */
router.delete(
    '/:id',
    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)

            if (!post) {
                return res.status(404).json({msg: 'Пост не найден'})
            }

            // Check user
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({msg: 'Пользователь не авторизован'})
            }

            await post.remove()

            return res.json({msg: 'Пост удалён'})
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(404).json({msg: 'Пост не найден'})
            }
            return res.status().send('Ошибка сервера')
        }
    }
)

/** @route   PUT /api/posts/like/:id
 *  @desc    Like a post
 *  @access  Private
 */
router.put(
    '/like/:id',
    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (!post) {
                return res.status(404).json({msg: 'Пост не найден'})
            }
            // Check if the post has already been liked
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({msg: 'Пост лайкнут'})
            }
            post.likes.unshift({user: req.user.id})
            post.save()
            return res.json(post.likes)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(404).json({msg: 'Пост не найден'})
            }
            return res.status().send('Ошибка сервера')
        }
    }
)

/** @route   PUT /api/posts/unlike/:id
 *  @desc    Unlike a post
 *  @access  Private
 */
router.put(
    '/unlike/:id',
    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (!post) {
                return res.status(404).json({msg: 'Пост не найден'})
            }

            // Check if the post has already been unliked
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({msg: 'Пост не лайкнут'})
            }

            // Get remove index
            const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

            post.likes.splice(removeIndex, 1)

            post.save()
            return res.json(post.likes)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(404).json({msg: 'Пост не найден'})
            }
            return res.status().send('Ошибка сервера')
        }
    }
)

/** @route   POST /api/posts/comment/:id
 *  @desc    Comment on a post
 *  @access  Private
 */
router.post(
    '/comment/:id',
    [
        auth,
        [
            check('text', 'Текст обязательный').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({errors: errors.array()})
        }
        try {
            const user = await User.findById(req.user.id).select('-password')
            const post = await Post.findById(req.params.id)

            if (!post) {
                return res.status(404).json({msg: 'Пост не найден'})
            }
            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            }

            post.comments.unshift(newComment)
            await post.save()

            return res.json(post.comments)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(404).json({msg: 'Пост не найден'})
            }
            return res.status().send('Ошибка сервера')
        }
    }
)

/**@route   DELETE /api/posts/comment/:id/:comment_id
 * @desc    Delete comment
 * @access  Private
 */
router.delete(
    '/comment/:id/:comment_id',
    auth,
    async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (!post) {
                return res.status(404).json({msg: 'Пост не найден'})
            }

            const comment = post.comments.find(comment => comment.id === req.params.comment_id)
            if (!comment) {
                return res.status(404).json({msg: 'Комментарий не найден'})
            }

            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({msg: 'Пользователь не авторизован'})
            }

            const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

            post.comments.splice(removeIndex, 1)
            await post.save()

            return res.json(post.comments)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(404).json({msg: 'Пост не найден'})
            }
            return res.status().send('Ошибка сервера')
        }
    }
)
module.exports = router
