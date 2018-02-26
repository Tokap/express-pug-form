// Note: Normally this would be it's own directory for organizational purposes.

// Limited ES6 usage for largest browser compatability. Arrow syntax & fetch used
// for readability in promise chains - could be transpiled in prod to account
// for improved ES6 syntax + max compatability via babel / webpack.

// The creation of helpers reused in multiple functions is meant to act as a form
// of clean code and decoupling. Additionally, by splitting larger events into
// smaller sub-functions, it is easier at a high level glance to know what is
// going on and easier to debug smaller pieces of the code based on symptoms.

// In short, composing unit functions makes the code easier to conceptualize
// in abstract terms, as well as debug should it be required.

// There is admittedly coupled code in the way the modal system is handled here.
// For a larger project, this file would also be modular in a dev environment and
// minified / merged for production.

// In terms of readability, promise chains are used to prevent callback madness
// and sections of code are, where possible, grouped by purpose & noted w /headers.

// --- Helpers and Error Handling
var HIDE = 'hidden'
var BLUR = 'blurred'

// - Generic Helpers
function removeChildren (el) {
  while (el.firstChild) { el.removeChild(el.firstChild) }
}

function toggleClass (el, className) {
  if (el.classList.contains(className)) {
    el.classList.remove(className)
  } else {
    el.classList.add(className)
  }
}

// - Modal Management
function toggleDisableButtons (boolean) {
  var buttons = document.getElementsByTagName('button')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = boolean
  }
}

function hideActiveModal (landingPage) {
  var formContainer = document.getElementById('new-form')
  var userDetails = document.getElementById('user-details')

  formContainer.classList.add(HIDE)
  userDetails.classList.add(HIDE)
  landingPage.classList.remove(BLUR)

  toggleDisableButtons(false)
}

function toggleModal (modalId) {
  var modal = document.getElementById(modalId)
  var landingPage = document.getElementById('landing')
  // Enable buttons on toggle
  toggleDisableButtons(false)
  // Then, if we're about to add blur, we need to disable buttons for modal mode
  if (!landingPage.classList.contains(BLUR)) toggleDisableButtons(true)
  // Always toggle the classes for the modal & background
  toggleClass(modal, HIDE)
  toggleClass(landingPage, BLUR)

}

// - Error Management
function addErrorToList(fieldName, errorMsg) {
  // Get Error container and clear existing children
  var errorContainer = document.getElementById(`${fieldName}-error`)
  removeChildren(errorContainer)

  // Then, create new LI to display current error list.
  var newError = document.createElement("li")
  newError.append(
    document.createTextNode(errorMsg)
  )
  errorContainer.appendChild(newError)
}

function clearAllErrors () {
  var nameErrors = document.getElementById(`name-error`)
  var usernameErrors = document.getElementById(`username-error`)
  var passwordErrors = document.getElementById(`password-error`)

  removeChildren(nameErrors)
  removeChildren(usernameErrors)
  removeChildren(passwordErrors)
}

// - User / Form Data: Create & Get
function clearAndHideForm () {
  document.getElementsByName("name")[0].value = ''
  document.getElementsByName("username")[0].value = ''
  document.getElementsByName("password")[0].value = ''

  toggleModal('new-form')
}

function getFormFields (formContainer) {
  return {
    name: document.getElementsByName("name")[0].value,
    username: document.getElementsByName("username")[0].value,
    password: document.getElementsByName("password")[0].value,
  }
}

function processSaveResponse (response) {
  if (response.status === 400) {
    response.validationResult.map(errorObj =>
      addErrorToList(errorObj.field, errorObj.msg)
    )
  }
  if (response.status === 200) {
    clearAllErrors()
    clearAndHideForm()
    return alert('Account details have been saved!')
  }
  // Would normally have some kind of error modal to go with this
  throw new Error('Bad times. Hit unlikely clause.')
}

function saveNewUser (event) {
  event.preventDefault()

  const formFields = getFormFields(event.target)
  const jsonForm = JSON.stringify(formFields)
  const headers = {
    'user-agent': 'Mozilla/4.0 MDN Example',
    'content-type': 'application/json'
  }

  return fetch('/user', { method: 'POST', body: jsonForm, headers: headers })
  .then(rawResponse => rawResponse.json())
  .then(response => processSaveResponse(response))
  .catch((err) => { console.log('Error During User Save: ', err) })
}

function getUserDetails () {
  return fetch('/user')
  .then(rawResponse => rawResponse.json())
  .then(user => {
    var { name, username, password } = user
    // If no feilds are missing data, update and display user info
    if (!(name == null) && !(username == null) && !(password == null)) {
      document.getElementById("name-display").innerHTML = 'Name: ' + name
      document.getElementById("username-display").innerHTML = 'Username: ' + username
      document.getElementById("password-display").innerHTML = 'Password: ' + password
    }

    return toggleModal('user-details')
  })
  .catch((err) => { console.log('Error During Get User Details: ', err) })
}

// --- Event Listeners for Page: Bringing it All Together
window.document.addEventListener('DOMContentLoaded', function () {
  // Add listeners for form submission & display of data.
  var formContainer = document.getElementById('new-form')
  formContainer.addEventListener('submit', saveNewUser)

  // Add listener for displaying hidden form on button press
  var displayFormButton = document.getElementById('form-trigger')
  displayFormButton.addEventListener('click', toggleModal.bind(null, 'new-form'))

  // Add listener to hide form modal when clicking off of it
  var landingPage = document.getElementById('landing')
  landingPage.addEventListener('click', function (event) {
    if (event.target.id !== 'form-trigger') hideActiveModal(landingPage)
  })

  // Add listener for displaying User info on button press
  var aboutYouButton = document.getElementById('about-you')
  aboutYouButton.addEventListener('click', getUserDetails)
})
