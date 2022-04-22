const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
	},
})

userSchema.virtual('userId').get(function () {
	return this._id.toHexString()
})

userSchema.set('toJSON', {
	virtuals: true,
})

exports.User = mongoose.model('User', userSchema)
