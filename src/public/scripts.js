// Note: Normally this would be it's own directory for organizational purposes.

// --- Helpers
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
function hideActiveModal (landingPage) {
  var formContainer = document.getElementById('new-form')
  var userDetails = document.getElementById('user-details')

  formContainer.classList.add(HIDE)
  userDetails.classList.add(HIDE)
  landingPage.classList.remove(BLUR)
}

function toggleModal (modalId) {
  var modal = document.getElementById(modalId)
  var landingPage = document.getElementById('landing')

  toggleClass(modal, HIDE)
  toggleClass(landingPage, BLUR)
}

// - Error Management

// - User / Form Data: Create & Get
function getUserDetails () {
  return fetch('/user')
  .then(rawResponse => rawResponse.json())
  .then(user => {
    var { name, username, password } = user
    // If no feilds are missing data, update and display user info
    if (!name == null && !username == null && !password == null) {
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
