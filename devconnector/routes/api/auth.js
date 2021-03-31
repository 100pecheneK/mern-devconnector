const express = require('express')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')
const router = express.Router()
const auth = require('../../middleware/auth')

const User = require('../../models/User')


/** @route   GET /api/auth
 *  @desc    Test route
 *  @access  Public
 */
router.get(
    '/',
    auth,
    async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password')
            res.json(user)
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }
    })


/** @route   POST /api/auth
 *  @desc    Authenticate user & get token
 *  @access  Public
 */
router.post(
    '/',
    [
        check('email',
            'Пожалуйста, укажите верный Email')
            .isEmail(),
        check('password',
            'Пароль обязательный')
            .exists()
    ],
    async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {name, email, password} = req.body
        try {
            // See if user exists
            let user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({errors: [{msg: 'Неверные данные'}]})
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({errors: [{msg: 'Неверные данные'}]})
            }

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {expiresIn: '1h'},
                (err, token) => {
                    if (err) throw err
                    res.json({token})
                }
            )
        } catch (e) {
            console.error(e.message)
            res.status(500).send('Ошибка сервера')
        }

    })
module.exports = router
