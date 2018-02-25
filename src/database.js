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
