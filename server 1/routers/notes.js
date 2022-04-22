const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const authJwt = require('../middleware/auth')

router.get('/all', async (req, res) => {
	fetch('http://localhost:4000/api/v1/notes/')
		.then((response) => response.json())
		.then((json) => res.json(json))
		.catch(function (err) {
			console.log('Unable to fetch -', err)
		})
})

router.post(`/add`, authJwt, async (req, res) => {
	fetch('http://localhost:4000/api/v1/notes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body),
	})
		.then((response) => response.json())
		.then((json) => res.json(json))
		.catch(function (err) {
			console.log('Unable to fetch -', err)
		})
})

router.post(`/update`, authJwt, async (req, res) => {
	fetch('http://localhost:4000/api/v1/notes/update', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body),
	})
		.then((response) => response.json())
		.then((json) => res.json(json))
		.catch(function (err) {
			console.log('Unable to fetch -', err)
		})
})

router.delete('/', authJwt, async (req, res) => {
	fetch('http://localhost:4000/api/v1/notes/remove', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(req.body),
	})
		.then((response) => response.json())
		.then((json) => res.json(json))
		.catch(function (err) {
			console.log('Unable to fetch -', err)
		})
})

module.exports = router
