export default function({ Cypress, cy, firebase }) {
  /**
   * Login to Firebase auth using FIREBASE_AUTH_JWT environment variable
   * which is generated using firebase-admin authenticated with serviceAccount
   * during test:buildConfig phase.
   *
   * @type {Cypress.Command}
   * @name cy.login
   * @example
   * cy.login()
   */
  Cypress.Commands.overwrite('login', credentials => {
    if (firebase.auth().currentUser) {
      cy.log('Authed user already exists, login complete.')
      return
    }

    if (!credentials.password || !credentials.email) {
      cy.fixture('/users/defaultTestingUser.json').then(user => {
        return login(user, firebase)
      })
    } else {
      return login(credentials, firebase)
    }
  })
}

const login = (user, firebase) =>
  new Promise((resolve, reject) => {
    // eslint-disable-line consistent-return
    firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        resolve(auth)
      }
    })
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .catch(reject)
  })
