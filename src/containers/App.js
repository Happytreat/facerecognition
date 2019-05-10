import React, { Component } from "react"
import Particles from "react-particles-js"
import Navigation from "../components/Navigation/Navigation"
import Logo from "../components/Logo/Logo"
import Rank from "../components/Rank/Rank"
import Form from "../components/Form/Form"
import Signin from "../components/Form/Signin/Signin"
import Register from "../components/Form/Register/Register"
import FaceRecognition from "../components/FaceRecognition/FaceRecognition"
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm"
import Loader from "react-loader-spinner"
import ParticleOptions from "./Particle"
import "./App.css"

const initialState = {
	input: "",
	imageUrl: "",
	box: {},
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

	calculateFaceLocation = data => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
		const image = document.getElementById("inputimage")
		const width = Number(image.width)
		const height = Number(image.height)
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height
		}
	}

	displayFaceBox = box => {
		console.log(box)
		this.setState({ box: box })
	}

	onInputChange = event => {
		this.setState({ input: event.target.value })
	}

	onPictureSubmit = () => {
		this.setState({ imageUrl: this.state.input })

		fetch("https://murmuring-plateau-15762.herokuapp.com/imageurl", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				input: this.state.input
			})
		})
			.then(response => response.json())
			.then(response => {
				console.log("Clarifai response", response)
				if (response) {
					fetch("https://murmuring-plateau-15762.herokuapp.com/image", {
						method: "put",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then(response => response.json())
						.then(count => {
							this.setState(Object.assign(this.state.user, { entries: count }))
						})
						.catch(console.log)
				}
				this.displayFaceBox(this.calculateFaceLocation(response))
			})
			.catch(err => console.log(err))
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

	isPending = true

	render() {
		const { isSignedIn, imageUrl, box, route } = this.state
		return (
			<div className='App'>
				<Particles className='particles' params={ParticleOptions} />
				<Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
				{this.isPending ? (
					<div className='centered'>
						<Loader type='Hearts' color='#FFF340' height={100} width={100} />
					</div>
				) : route === "home" ? (
					<div>
						<Logo />
						<Rank name={this.state.user.name} entries={this.state.user.entries} />
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onPictureSubmit={this.onPictureSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
				) : route === "signin" ? (
					<Signin
						loadUser={this.loadUser}
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
						loadUser={this.loadUser}
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

export default App
