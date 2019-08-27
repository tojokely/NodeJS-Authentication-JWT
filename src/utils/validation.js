// Validation
import Joi from '@hapi/joi'

// RegisterValidation
export const registerValidation = (data) => {
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  }
  return Joi.validate(data, schema)
}

/// LoginValidation
export const loginValidation = (data) => {
  // Define a schema
  const schema = {
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
  }
  // Validate with Joi
  return Joi.validate(data, schema)
}
