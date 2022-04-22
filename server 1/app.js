const express = require('express')
const mongoose = require('mongoose')
require('dotenv/config')
const notesRouter = require('./routers/notes')
const userRouter = require('./routers/users')
const userProfileRouter = require('./routers/userProfiles')
const authJwt = require('./middleware/jwt')

const api = process.env.API_URL

const app = express()

app.use(express.json())

app.use(`${api}/notes`, notesRouter)
app.use(`${api}/userProfiles`, userProfileRouter)
app.use(`${api}/user`, userRouter)

mongoose
	.connect(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
	})
	.then(() => console.log('Connection is ready'))
	.catch((err) => console.log(err))

app.listen(3000, () => {
	console.log(api)
	console.log('Servert is running on http://localhost:3000')
})
