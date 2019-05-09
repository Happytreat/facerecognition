const ParticleOptions = {
	particles: {
		number: {
			value: 70,
			density: {
				enable: true
			}
		},
		size: {
			value: 10,
			random: true
		},
		move: {
			direction: "bottom",
			out_mode: "out"
		},
		line_linked: {
			enable: false
		}
	},
	interactivity: {
		events: {
			onclick: {
				enable: true,
				mode: "remove"
			}
		},
		modes: {
			remove: {
				particles_nb: 10
			}
		}
	}
}

export default ParticleOptions
