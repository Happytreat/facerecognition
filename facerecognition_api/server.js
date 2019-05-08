const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require("knex")
const register = require("./controllers/register")
const signin = require("./controllers/signin")
const profile = require("./controllers/profile")
const image = require("./controllers/image")

//TODO: Get rid of database empty account
//TODO: Restrict Empty string inputs

const db = knex({
	client: "pg",
	connection: {
		host: "127.0.0.1",
		user: "postgres",
		password: "test",
		database: "face-recognition"
	}
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get("/", (req, res) => {
	res.send("This is the working server.")
})

app.post("/signin", (req, res) => {
	signin.handleSignin(req, res, db, bcrypt)
})

app.post("/register", (req, res) => {
	register.handleRegister(req, res, db, bcrypt)
})

app.get("/profile/:id", (req, res) => {
	profile.handleProfile(req, res, db)
})

app.put("/image", (req, res) => {
	image.handleImage(req, res, db)
})

app.listen(3001, () => {
	console.log("App is running on port 3001.")
})
