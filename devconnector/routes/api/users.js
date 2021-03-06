 const express = require('express')
const router = express.Router()
const {check, validationResult} = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')


/**
 * @route   POST /api/users
 * @desc    Register user
 * @access  Public
 */


router.post(
    '/',
    [
        check('name',
            'Имя обязательно')
            .not().isEmpty(),
        check('email',
            'Пожалуйста, укажите верный Email')
            .isEmail(),
        check('password',
            'Пожалуйста, введите пароль с 6 или более символами')
            .isLength({min: 6})
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
            if (user) {
                return res.status(400).json({errors: [{msg: 'Пользователь с таким Email уже существует'}]})
            }

            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            })


            // Add user to DataBase
            user = new User({
                name,
                email,
                avatar,
                password
            })

            // Encrypt password
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save()

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
