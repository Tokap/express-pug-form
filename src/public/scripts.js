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

// - Error Management

// - User / Form Data: Create & Get


window.document.addEventListener('DOMContentLoaded', function () {

})
