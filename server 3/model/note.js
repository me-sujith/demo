const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
	noteText: {
		type: String,
		required: true,
	},

	userId: {
		type: String,
		required: true,
	},
	userProfile: {
		type: String,
		required: true,
	},
})

noteSchema.virtual('noteId').get(function () {
	return this._id.toHexString()
})

noteSchema.set('toJSON', {
	virtuals: true,
})

exports.Note = mongoose.model('Note', noteSchema)
