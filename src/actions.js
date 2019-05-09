import { CHANGE_EMAIL_FIELD, CHANGE_PASSWORD_FIELD, CHANGE_NAME_FIELD } from "./constants"

export const onEmailChange = text => ({
	type: CHANGE_EMAIL_FIELD,
	payload: text
})

export const onPasswordChange = text => ({
	type: CHANGE_PASSWORD_FIELD,
	payload: text
})

export const onNameChange = text => ({
	type: CHANGE_NAME_FIELD,
	payload: text
})
