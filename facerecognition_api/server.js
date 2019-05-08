const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")
const knex = require("knex")

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

const database = {
	users: [
		{
			id: "123",
			name: "John",
			email: "john@gmail.com",
			password: "cookies",
			entries: 0,
			joined: new Date()
		},
		{
			id: "124",
			name: "Sally",
			email: "sally@gmail.com",
			password: "sally",
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id: "987",
			hash: "",
			email: "john@gmail.com"
		}
	]
}

app.get("/", (req, res) => {
	res.send(database.users)
})

app.post("/signin", (req, res) => {
	if (
		req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password
	) {
		res.json(database.users[0])
	} else {
		res.status(400).json("Error logging in.")
	}
})

app.post("/register", (req, res) => {
	const { email, name, password } = req.body
	bcrypt.hash(password, null, null, function(err, hash) {
		//console.log(hash)
	})
	db("users")
		.returning("*")
		.insert({
			email: email,
			name: name,
			joined: new Date()
		})
		.then(user => {
			console.log(user[0])
			res.json(user[0])
		})
		.catch(err => res.status(400).json("Unable to register."))
})

app.get("/profile/:id", (req, res) => {
	const { id } = req.params
	db.select("*")
		.from("users")
		.where({ id })
		.then(user => {
			user.length ? res.json(user[0]) : res.status(404).json("No such user")
		})
	// if (!found) {
	// 	res.status(404).json("No such user")
	// }
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
