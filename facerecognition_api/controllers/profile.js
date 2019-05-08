const handleProfileGet = db => (req, res) => {
	const { id } = req.params
	db.select("*")
		.from("users")
		.where({ id })
		.then(user => {
			user.length ? res.json(user[0]) : res.status(404).json("No such user")
		})
}
module.exports = {
	handleProfileGet
}
