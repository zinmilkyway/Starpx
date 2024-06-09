import { string } from 'yup'
// import { passwordRegex } from './regex'

export const isEmail = string().email().required()
export const isString = string()
export const isEmpty = string().trim().required()

// export const isPasswordValid = string().trim().required().min(8).max(20).matches(passwordRegex)
export const isPasswordValid = string().trim().required()
