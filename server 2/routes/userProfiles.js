const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { UserProfile } = require('../model/userProfile')

router.get('/', async (req, res) => {
	const userList = await UserProfile.find()
	if (!userList) {
		res.status(500).json({ success: false })
	}
	res.send(userList)
})

router.get('/:id', async (req, res) => {
	const userProfile = await UserProfile.findById(req.params.id)
	if (!userProfile) {
		res.status(404).json({
			message:
				' The UserProfile with given ID was not available ' + req.params.id,
		})
	}
	res.status(200).send(userProfile)
})

router.post(`/`, async (req, res) => {
	let userProfile = new UserProfile({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		address: req.body.address,
	})
	console.log(req.body.firstName)
	userProfile = await userProfile.save()
	if (!userProfile) {
		return res.status(500).send(`The User Profile Cannot be created`)
	}
	return res.status(200).json(userProfile)
})

module.exports = router
