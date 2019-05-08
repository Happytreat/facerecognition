import React from "react"

const Form = ({ title, inputLabels, inputMethods, buttonLabels, buttonMethods }) => {
	let inputFields = []
	let buttons = []
	let keyIndex = 0
	return (
		<article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
			<main className='pa4 black-80'>
				<div className='measure'>
					<fieldset id='title' className='ba b--transparent ph0 mh0'>
						<legend className='f1 fw6 ph0 mh0'>{`${title}`}</legend>
						{inputLabels.forEach((label, index) => {
							inputFields.push(
								<div className='mt3' key={keyIndex}>
									<label className='db fw6 lh-copy f6' htmlFor={`${label}`}>
										{label}
									</label>
									<input
										onChange={inputMethods[index]}
										className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
										type={label}
									/>
								</div>
							)
							keyIndex++
						})}
						{inputFields}
					</fieldset>
					{buttonLabels.forEach((label, index) => {
						if (label !== "Register") {
							buttons.push(
								<div className={label} key={keyIndex}>
									<input
										onClick={buttonMethods[index]}
										className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
										type='submit'
										value={label}
									/>
								</div>
							)
						} else {
							buttons.push(
								<div className='lh-copy mt3' key={keyIndex}>
									<p onClick={buttonMethods[index]} className='f6 link dim black db pointer'>
										Register
									</p>
								</div>
							)
						}
						keyIndex++
					})}
					{buttons}
				</div>
			</main>
		</article>
	)
}

export default Form
