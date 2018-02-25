// Mock Database: would use PostgreSQL or MySQL for simple backend.

let mockDatabase = {
  name: null,
  username: null,
  password: null,
}

// Created as Async Functions to Simulate a real DB interaction
function getFormData () {
  return Object.assign({}, mockDatabase)
}

function updateFormData (name, username, password) {
  mockDatabase.name = name
  mockDatabase.username = username
  mockDatabase.password = password
  return true
}

// --- Validation Helpers
function containsUpperCase(str) {
  return (/[A-Z]/.test(str))
}

function isEmptyOrNull (value) {
  // Double Equals used for null/undefined check
  return value == null || value === ''
}

// --- Validation
function validateForm (formData) {
  const { name, username, password } = formData
  const errorContainer = []

  // - Name
  if (isEmptyOrNull(name)) {
    errorContainer.push({ msg: 'Name cannot be empty.', field: 'name' })
  }
  // - Username
  if (isEmptyOrNull(username)) {
    errorContainer.push({ msg: 'Username cannot be empty.', field: 'username' })
  }
  // - Password - Would normally encrypt.
  if (isEmptyOrNull(password)) {
    errorContainer.push({ msg: 'Password cannot be empty.', field: 'password' })
  } else if (password.length < 8) {
    errorContainer.push({
      msg: 'Password must be more than 8 characters.',
      field: 'password',
    })
  } else if (!containsUpperCase(password)) {
    errorContainer.push({
      msg: 'Password must include capital letters.',
      field: 'password',
    })
  }

  // If we have accumulated Errors, return them:
  if (errorContainer.length > 0) return errorContainer
  // Otherwise, return null if no problems:
  return null
}

module.exports = {
  getFormData,
  updateFormData,
  validateForm,
}
