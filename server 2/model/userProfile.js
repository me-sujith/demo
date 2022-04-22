const mongoose = require('mongoose')

const userProfileSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
})

userProfileSchema.virtual('userProfileId').get(function () {
	return this._id.toHexString()
})

userProfileSchema.set('toJSON', {
	virtuals: true,
})

exports.UserProfile = mongoose.model('UserProfile', userProfileSchema)
