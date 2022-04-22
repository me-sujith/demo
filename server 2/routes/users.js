const { User } = require('../model/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.get('/', async (req, res) => {
	const userList = await User.find().select('-password')
	if (!userList) {
		res.status(500).json({ success: false })
	}
	res.send(userList)
})

router.get('/:id', async (req, res) => {
	const userList = await User.findById(req.params.id)
	if (!userList) {
		res.status(500).json({ success: false })
	}
	res.send(userList)
})

router.post('/register', async (req, res) => {
	let user = new User({
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 10),
	})
	user = await user.save()

	if (!user) {
		return res.status(404).send('The user cannot be created')
	}
	res.send(user)
})
router.post('/login', async (req, res) => {
	const user = await User.findOne({ email: req.body.email })

	if (!user) return res.status(400).send('The user not found')
	if (user && bcrypt.compareSync(req.body.password, user.password)) {
		user.token = Date.now()
		user.save()
		const token = jwt.sign(
			{
				userId: user.id,
				token: user.token,
			},
			process.env.SECRET,
			{ expiresIn: '1d' }
		)
		return res.status(200).send({ user: user.email, token: token })
	} else {
		return res.status(400).send('The password is incorrect')
	}
})

router.post('/logout', async (req, res) => {
	const token = jwt.verify(req.body.token, process.env.SECRET)
	const user = await User.findById(token.userId)
	user.token = ''
	user.save()
	return res.status(200).send('OK')
})

module.exports = router
