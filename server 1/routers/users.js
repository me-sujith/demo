const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

router.get('/', async (req, res) => {
	fetch('http://localhost:5000/api/v1/user/')
		.then((response) => response.json())
		.then((json) => res.json(json))
		.catch(function (err) {
			console.log('Unable to fetch -', err)
		})
})

router.post(`/register`, async (req, res) => {
	fetch('http://localhost:5000/api/v1/user/register/', {
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

router.post(`/login`, async (req, res) => {
	fetch('http://localhost:5000/api/v1/user/login/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body),
	})
		.then((response) => response.json())
		.then((json) => {
			res.json(json)
		})
		.catch((error) => {
			console.error('Error:', error)
		})
})

router.get('/logout', async (req, res) => {
	fetch('http://localhost:5000/api/v1/user/logout/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: req.headers.authorization.slice('Bearer '.length),
		}),
	})
		.then((response) => response.text())
		.then((text) => {
			res.send(text)
		})
		.catch((error) => {
			console.error('Error:', error)
		})
})

module.exports = router
