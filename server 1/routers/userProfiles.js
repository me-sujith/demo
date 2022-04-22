const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', async (req, res) => {
	fetch('http://localhost:5000/api/v1/userProfiles/')
		.then((response) => response.json())
		.then((json) => res.json(json))
		.catch(function (err) {
			console.log('Unable to fetch -', err)
		})
})

router.post(`/create`, async (req, res) => {
	fetch('http://localhost:5000/api/v1/userProfiles/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body),
	})
		.then((response) => response.json())
		.then((json) => res.json(json))
		.catch((error) => {
			console.error('Error:', error)
		})
})

module.exports = router
