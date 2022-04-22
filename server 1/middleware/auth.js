const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')

module.exports = function (req, res, next) {
	if (req.headers.authorization) {
		try {
			const token = jwt.verify(
				req.headers.authorization.slice('Bearer '.length),
				process.env.SECRET
			)
			fetch('http://localhost:5000/api/v1/user/' + token.userId)
				.then((response) => response.json())
				.then((json) => {
					if (json?.token === token.token) {
						next()
					} else {
						return res.status(401).json('unauthorized access')
					}
				})
				.catch(function (err) {
					return res.status(401).json('Technical Isuues')
				})
		} catch (error) {
			return res.status(401).json('Token Expired, login again')
		}
	} else {
		return res.status(401).json('Token Expired')
	}
}
