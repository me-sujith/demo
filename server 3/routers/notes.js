const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { Note } = require('../model/note')

router.get('/', async (req, res) => {
	const noteList = await Note.find()
	if (!noteList) {
		res.status(500).json({ success: false })
	}
	res.send(noteList)
})

router.get('/:id', async (req, res) => {
	const note = await Note.findById(req.params.id)
	if (!note) {
		res.status(404).json({
			message: ' The note with given ID was not available ' + req.params.id,
		})
	}
	res.status(200).send(note)
})

router.post(`/`, async (req, res) => {
	let note = new Note({
		noteText: req.body.noteText,
		fileUpload: req.body.fileUpload,
		userId: req.body.userId,
		userProfile: req.body.userProfileId,
	})
	note = await note.save()
	if (!note) {
		return res.status(500).send(`The Note Cannot be created`)
	}
	return res.status(200).json(note)
})

router.post('/update', async (req, res) => {
	const noteExist = await Note.findById(req.body.id)
	if (!noteExist) return res.status(404).send('Invalid note ID')
	const note = await Note.findByIdAndUpdate(
		req.body.id,
		{
			noteText: req.body.noteText,
			fileUpload: req.body.fileUpload,
			userId: req.body.userId,
			userProfile: req.body.userProfileId,
		},
		{ new: true }
	)

	if (!note) {
		res.status(500).json({
			message: ' The not can not updated ' + req.body.id,
		})
	}
	res.status(200).send(note)
})

router.delete('/remove', (req, res) => {
	console.log(req.body.id)
	Note.findByIdAndRemove(req.body.id)
		.then((note) => {
			if (note) {
				return res
					.status(200)
					.json({ success: true, message: 'The note is deleted' })
			} else {
				return res
					.status(404)
					.json({ success: false, message: 'note not found' })
			}
		})
		.catch((err) => {
			return res.status(400).json({ success: false, error: err })
		})
})

module.exports = router
