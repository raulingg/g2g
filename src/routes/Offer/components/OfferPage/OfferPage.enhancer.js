import PropTypes from 'prop-types'
import { compose, setDisplayName, withHandlers, setPropTypes } from 'recompose'
import { withFirebase, withFirestore } from 'react-redux-firebase'
import { withStyles } from '@material-ui/core/styles'
import { UserIsAuthenticated } from 'utils/router'
import styles from './OfferPage.styles'
import cuid from 'cuid'

export default compose(
  // Set component display name (more clear in dev/error tools)
  setDisplayName('EnhancedOfferPage'),
  // redirect to /projects if user is already authed
  UserIsAuthenticated,
  withFirebase,
  withFirestore,
  setPropTypes({
    firebase: PropTypes.shape({
      auth: PropTypes.func.isRequired,
      uploadFile: PropTypes.func.isRequired
    }),
    firestore: PropTypes.shape({
      add: PropTypes.func.isRequired
    })
  }),
  withHandlers({
    addOffer: props => async (newInstance, photos) => {
      const { firestore, firebase } = props

      const user = firebase.auth().currentUser
      const path = `${user.uid}/photos`

      if (!user.uid) {
        return new Error('Debes ingresar a tu cuenta antes de crear una oferta')
      }

      return Promise.all(
        photos.map(photo => {
          const photoName = cuid()
          let resultPath

          return firebase
            .uploadFile(path, photo.croppedBlob, null, {
              name: photoName
            })
            .then(result => {
              resultPath = result.uploadTaskSnapshot.ref.fullPath
              return result.uploadTaskSnapshot.ref.getDownloadURL()
            })
            .then(downloadUrl => {
              return { path: resultPath, url: downloadUrl }
            })
            .catch(error => console.error('Error', error.message || error)) // eslint-disable-line no-console
        })
      )
        .then(photosData => {
          return firestore.add(
            { collection: 'offers' },
            {
              ...newInstance,
              photos: photosData,
              createdBy: user.uid,
              createdAt: firestore.FieldValue.serverTimestamp(),
              updatedAt: firestore.FieldValue.serverTimestamp()
            }
          )
        })
        .catch(error => {
          console.error('Error', error.message || error) // eslint-disable-line no-console
          throw error
        })
    }
  }),
  // Add styles as props.classes
  withStyles(styles, { withTheme: true })
)
