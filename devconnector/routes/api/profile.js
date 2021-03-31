const express = require('express')
const request = require('request')
const config = require('config')
const router = express.Router()
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')

/**
 * @route   GET /api/profile/me
 * @desc    Get current users profile
 * @access  Private
 */
router.get(
    '/me',
    auth,
    async (req, res) => {
        try {
            const profile = await Profile.findOne({user: req.user.id})
                .populate('user', ['name', 'avatar'])

            if (!profile) {
                return res.status(400).json({msg: 'Нет профиля для этого пользователя'})
            }

            res.json(profile)

        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

/** @route   POST /api/profile
 *  @desc    Create or update user profile
 *  @access  Private
 */
router.post(
    '/',
    [
        auth,
        [
            check('status', 'Статус обязательный').not().isEmpty(),
            check('skills', 'Навыки обязательны').not().isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            twitter,
            facebook,
            linkedin,
            instagram,
            vkontakte,
        } = req.body

        // Build profile object
        const profileFields = {}

        profileFields.user = req.user.id

        if (company) profileFields.company = company
        if (website) profileFields.website = website
        if (location) profileFields.location = location
        if (bio) profileFields.bio = bio
        if (status) profileFields.status = status
        if (githubusername) profileFields.githubusername = githubusername
        if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim())


        // Build social object
        profileFields.social = {}
        if (youtube) profileFields.social.youtube = youtube
        if (twitter) profileFields.social.twitter = twitter
        if (facebook) profileFields.social.facebook = facebook
        if (linkedin) profileFields.social.linkedin = linkedin
        if (instagram) profileFields.social.instagram = instagram
        if (vkontakte) profileFields.social.vkontakte = vkontakte

        try {
            let profile = await Profile.findOne({user: req.user.id})
            if (profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    {user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                )
            } else {
                // Create
                profile = new Profile(profileFields)
            }
            await profile.save()
            return res.json(profile)
        } catch (e) {
            console.error(e)
            res.status(500).send('Ошибка сервера')
        }
    }
)

// @route   GET /api/profile
// @desc    Get all profiles
// @access  Public
router.get(
    '/',
    async (req, res) => {
        try {
            const profiles = await Profile.find().populate('user', ['name', 'avatar'])
            return res.json(profiles)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

/** @route   GET /api/profile/user/:user_id
 *  @desc    Get profile by user ID
 *  @access  Public
 */
router.get(
    '/user/:user_id',
    async (req, res) => {
        try {
            const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar'])

            if (!profile) return res.status(400).json({msg: 'Профиль не найден'})

            return res.json(profile)
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Профиль не найден'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })

/**@route   DELETE /api/profile
 * @desc    Delete profile, user & posts
 * @access  Private
 */
router.delete(
    '/',
    auth,
    async (req, res) => {
        try {
            // Remove users posts
            await Post.deleteMany({user: req.user.id})
            // Remove profile
            await Profile.findOneAndRemove({user: req.user.id})
            // Remove user
            await User.findOneAndRemove({_id: req.user.id})

            return res.json({msg: 'Пользователь удалён'})
        } catch (e) {
            console.error(e.message)
            if (e.kind === 'ObjectId') {
                return res.status(400).json({msg: 'Профиль не найден'})
            }
            res.status(500).send('Ошибка сервера')
        }
    })

/**@route   PUT /api/profile/experience
 * @desc    Add profile experience
 * @access  Private
 */
router.put(
    '/experience',
    [
        auth,
        [
            check('title', 'Заголовок обязательный').not().isEmpty(),
            check('company', 'Компания обязательна').not().isEmpty(),
            check('from', 'Дата начала обязательно').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {title, company, location, from, to, current, description} = req.body
        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }
        try {
            // @todo - Если профиля нет, то не добавляется
            const profile = await Profile.findOne({user: req.user.id})

            profile.experience.unshift(newExp)
            await profile.save()

            return res.json(profile)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })

/** @route   DELETE /api/profile/experience/:exp_id
 *  @desc    Delete experience from profile
 *  @access  Private
 */
router.delete(
    '/experience/:exp_id',
    auth,
    async (req, res) => {
        try {
            const profile = await Profile.findOne({user: req.user.id})

            // Get remove index
            const removeIndex = profile.experience
                .map(exp => exp.id)
                .indexOf(req.params.exp_id)

            if (removeIndex < 0) {
                return res.status(400).json({msg: 'Опыт не найден'})
            }

            profile.experience.splice(removeIndex, 1)
            await profile.save()
            return res.json(profile)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    }
)

/**@route   PUT /api/profile/education
 * @desc    Add profile education
 * @access  Private
 */
router.put(
    '/education',
    [
        auth,
        [
            check('school', 'Школа обялательна').not().isEmpty(),
            check('degree', 'Спепеть обязательна').not().isEmpty(),
            check('fieldofstudy', 'Область обучения обязательна').not().isEmpty(),
            check('from', 'Дата начала обязательно').not().isEmpty(),
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {school, degree, fieldofstudy, from, to, current, description} = req.body
        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }
        try {
            // @todo - Если профиля нет, то не добавляется
            const profile = await Profile.findOne({user: req.user.id})

            profile.education.unshift(newEdu)
            await profile.save()

            return res.json(profile)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    }
)

/**@route   DELETE /api/profile/education/:edu_id
 * @desc    Delete education from profile
 * @access  Private
 */
router.delete(
    '/education/:edu_id',
    auth,
    async (req, res) => {
        try {
            const profile = await Profile.findOne({user: req.user.id})

            // Get remove index
            const removeIndex = profile.education
                .map(edu => edu.id)
                .indexOf(req.params.edu_id)

            if (removeIndex < 0) {
                return res.status(400).json({msg: 'Обраование не найдено'})
            }

            profile.education.splice(removeIndex, 1)
            await profile.save()
            return res.json(profile)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    }
)

/**@route   GET /api/profile/github/:username
 * @desc    Get user repos from GitHub
 * @access  Public
 */
router.get(
    '/github/:username',
    (req, res) => {
        try {
            const options = {
                uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
                method: 'GET',
                headers: {'user-agent': 'node.js'}
            }
            request(options, (error, response, body) => {
                if (error) console.error(error)
                if (response.statusCode !== 200) {
                    console.log(JSON.parse(body))
                    return res.status(404).json({msg: 'Профиль GitHub не найден'})
                }
                return res.json(JSON.parse(body))
            })
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    }
)

module.exports = router
