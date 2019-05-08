const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require("knex")
const register = require("./controllers/register")

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
	const { email, password } = req.body
	db.select("email", "hash")
		.from("login")
		.where("email", "=", email)
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash)
			isValid
				? db
						.select("*")
						.from("users")
						.where("email", "=", email)
						.then(user => {
							res.json(user[0])
						})
						.catch(err => res.status(400).json("Unable to get user."))
				: res.status(400).json("Wrong credentials.")
		})
		.catch(err => res.status(400).json("Wrong credentials."))
})

app.post("/register", (req, res) => {
	register.handleRegister(req, res, db, bcrypt)
})

app.get("/profile/:id", (req, res) => {
	const { id } = req.params
	db.select("*")
		.from("users")
		.where({ id })
		.then(user => {
			user.length ? res.json(user[0]) : res.status(404).json("No such user")
		})
})

app.put("/image", (req, res) => {
	const { id } = req.body
	db("users")
		.where("id", "=", id)
		.increment("entries", 1)
		.returning("entries")
		.then(entries => {
			entries.length ? res.json(entries[0]) : res.status(400).json("Unable to get entries.")
		})
})

app.listen(3001, () => {
	console.log("App is running on port 3001.")
})
