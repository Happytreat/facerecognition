import React from "react"

const initialState = {
	signInEmail: "",
	signInPassword: ""
}

class Signin extends React.Component {
	constructor(props) {
		super(props)
		this.state = initialState
	}

	onEmailChange = event => {
		this.setState({ signInEmail: event.target.value })
	}

	onPasswordChange = event => {
		this.setState({ signInPassword: event.target.value })
	}

	onSubmitSignIn = () => {
		console.log("In Sign in.")
		fetch("https://murmuring-plateau-15762.herokuapp.com/signin", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPassword
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user)
					this.props.onRouteChange("home")
				}
			})
	}

	render() {
		return this.props.render({
			title: "Sign In",
			inputLabels: ["Email", "Password"],
			inputMethods: [this.onEmailChange, this.onPasswordChange],
			buttonLabels: ["Sign In", "Register"],
			buttonMethods: [this.onSubmitSignIn, () => this.props.onRouteChange("register")]
		})
	}
}

export default Signin