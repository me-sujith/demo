const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/users')
const userProfileRouter = require('./routes/userProfiles')
require('dotenv/config')
const api = process.env.API_URL

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))

//Routers

app.use(`${api}/user`, userRouter)
app.use(`${api}/userProfiles`, userProfileRouter)

mongoose
	.connect(process.env.CONNECTION_STRING, {
		useNewUrlParser: true,
	})
	.then(() => console.log('Connection is ready'))
	.catch((err) => console.log(err))

app.listen(5000, () => {
	console.log(api)
	console.log('Servert is running on http://localhost:5000')
})
