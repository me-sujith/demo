const mongoose = require('mongoose')

const authSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
})

authSchema.virtual('id').get(function () {
	return this._id.toHexString()
})

authSchema.set('toJSON', {
	virtuals: true,
})

exports.Auth = mongoose.model('Auth', authSchema)
