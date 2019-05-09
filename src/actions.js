import { CHANGE_EMAIL_FIELD, CHANGE_PASSWORD_FIELD, CHANGE_NAME_FIELD } from "./constants"

export const setEmailField = text => ({
	type: CHANGE_EMAIL_FIELD,
	payload: text
})

export const setPasswordField = text => ({
	type: CHANGE_PASSWORD_FIELD,
	payload: text
})

export const setNameField = text => ({
	type: CHANGE_NAME_FIELD,
	payload: text
})
