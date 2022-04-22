var { expressjwt: jwt } = require('express-jwt')

function authJwt() {
	const secret = process.env.secret
	const api = process.env.API_URL
	return jwt({
		secret,
		algorithms: ['HS256'],
	}).unless({
		path: [{ url: /\/api\/v1\/user(.*)/, methods: ['GET', 'POST', 'OPTIONS'] }],
	})
}

module.exports = authJwt
