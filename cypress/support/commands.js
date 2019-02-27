import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { attachCustomCommands } from 'cypress-firebase'
import attachCustomLoginCommand from './auth'

const projectId = Cypress.env('FIREBASE_PROJECT_ID')
const env = Cypress.env('env') || 'stage'
const apiKey =
  Cypress.env(`${env.toUpperCase()}_FIREBASE_API_KEY`) ||
  Cypress.env('FIREBASE_API_KEY')

const fbConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId: `${projectId}`,
  storageBucket: `${projectId}.appspot.com`
}

window.fbInstance = firebase.initializeApp(fbConfig)

// Custom commands including login, signup, callRtdb, and callFirestore
attachCustomCommands({ Cypress, cy, firebase })
attachCustomLoginCommand({ Cypress, cy, firebase })

/**
 * Load a image file using directly the drop event of the windows object
 *
 * @param {DOMElement} subject - DOM element where the file is dropped
 * @param {string} fileName - Path of the file within the cypress/fixtures folder
 */
Cypress.Commands.add(
  'dropFile',
  { prevSubject: 'element' },
  (subject, fileName) => {
    return cy
      .fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        // instantiate File from `application` window, not cypress window
        return cy.window().then(win => {
          const testFile = new win.File([blob], fileName, {
            type: 'image/jpeg'
          })
          const dataTransfer = new win.DataTransfer()
          dataTransfer.items.add(testFile)
          return cy.wrap(subject).trigger('drop', { dataTransfer })
        })
      })
  }
)
