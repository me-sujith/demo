const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const notesRouter = require('./routers/notes')
require('dotenv/config')
const api = process.env.API_URL

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))

//Routers

app.use(`${api}/notes`, notesRouter)

mongoose
	.connect(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
	})
	.then(() => console.log('Connection is ready'))
	.catch((err) => console.log(err))

app.listen(4000, () => {
	console.log(api)
	console.log('Servert is running on http://localhost:4000')
})
