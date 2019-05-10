import React, { Component } from "react"
import Logo from "../components/Logo/Logo"
import Rank from "../components/Rank/Rank"
import FaceRecognition from "../components/FaceRecognition/FaceRecognition"
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm"

const initialState = {
	input: "",
	imageUrl: "",
	box: {},
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: ""
	}
}

class Home extends Component {
	constructor() {
		super()
		this.state = initialState
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
		//console.log(box)
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

	render() {
		const { imageUrl, box } = this.state
		return (
			<div>
				<Logo />
				<Rank name={this.state.user.name} entries={this.state.user.entries} />
				<ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
				<FaceRecognition box={box} imageUrl={imageUrl} />
			</div>
		)
	}
}

export default Home
