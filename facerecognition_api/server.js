const express = require("express")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt-nodejs")
const cors = require("cors")

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
		console.log(hash)
	})
	database.users.push({
		id: "125",
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length - 1])
})

const findIdThenPerform = (res, id, returnValue, f) => {
	let found = false
	database.users.forEach(user => {
		if (user.id === id) {
			found = true
			f()
			return res.json(returnValue)
		}
	})
	if (!found) {
		res.status(404).json("No such user")
	}
}

app.get("/profile/:id", (req, res) => {
	const { id } = req.params
	findIdThenPerform(res, id, database.users, () => {})
})

app.put("/image", (req, res) => {
	const { id } = req.body
	let found = false
	database.users.forEach(user => {
		if (user.id === id) {
			found = true
			user.entries++
			return res.json(user.entries)
		}
	})
	if (!found) {
		res.status(404).json("No such user")
	}
})

app.listen(3001, () => {
	console.log("App is running on port 3001.")
})

/* 
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT  --> user

*/
