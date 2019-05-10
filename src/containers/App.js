import React, { Component } from "react"
import Particles from "react-particles-js"
import Navigation from "../components/Navigation/Navigation"
import Form from "../components/Form/Form"
import Signin from "../components/Form/Signin/Signin"
import Register from "../components/Form/Register/Register"
import Dashboard from "./Dashboard"
import Loader from "react-loader-spinner"
import ParticleOptions from "./Particle"
import { connect } from "react-redux"
import "./App.css"

const initialState = {
	route: "signin",
	isSignedIn: false,
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: ""
	}
}

const mapStateToProps = state => {
	return {
		isPending: state.updatePendingStatus.isPending
	}
}

const mapDispatchToProps = dispatch => {
	return {}
}

class App extends Component {
	constructor() {
		super()
		this.state = initialState
	}

	loadUser = data => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		})
	}

	onRouteChange = route => {
		if (route === "signout") {
			this.setState(initialState)
			console.log("After Sign Out: ", this.state.route)
		} else if (route === "home") {
			this.setState({ isSignedIn: true })
			this.setState({ route: route })
		} else {
			this.setState({ route: route })
		}
	}

	// Have to create a signout reducer too (for nav bar) - clear to initialState (for user and not sign in status)

	render() {
		const { isSignedIn, route, user } = this.state
		return (
			<div className='App'>
				<Particles className='particles' params={ParticleOptions} />
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
				{this.props.isPending ? (
					<div className='centered'>
						<Loader type='Hearts' color='#FFF340' height={100} width={100} />
					</div>
				) : route === "home" ? (
					<div>
						<Dashboard user={user} />
					</div>
				) : route === "signin" ? (
					<Signin
						onRouteChange={this.onRouteChange}
						render={({ title, inputLabels, inputMethods, buttonLabels, buttonMethods }) => (
							<Form
								title={title}
								inputLabels={inputLabels}
								inputMethods={inputMethods}
								buttonLabels={buttonLabels}
								buttonMethods={buttonMethods}
							/>
						)}
					/>
				) : (
					<Register
						onRouteChange={this.onRouteChange}
						render={({ title, inputLabels, inputMethods, buttonLabels, buttonMethods }) => (
							<Form
								title={title}
								inputLabels={inputLabels}
								inputMethods={inputMethods}
								buttonLabels={buttonLabels}
								buttonMethods={buttonMethods}
							/>
						)}
					/>
				)}
			</div>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
