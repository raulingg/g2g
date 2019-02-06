import PropTypes from 'prop-types'
import {
  compose,
  setPropTypes,
  withStateHandlers,
  withHandlers
} from 'recompose'
import { withNotifications } from 'modules/notification'
import { withStyles } from '@material-ui/core/styles'
import styles from './ImageCropper.styles'
import { getDataUrlFromFile, cropImage } from 'utils/image'
import { connect } from 'react-redux'
import * as actions from '../actions'

export default compose(
  withNotifications,
  connect(
    ({ imageCropper }) => ({ photos: imageCropper }),
    actions
  ),
  setPropTypes({
    photos: PropTypes.array.isRequired,
    addImage: PropTypes.func.isRequired,
    updateImage: PropTypes.func.isRequired,
    showSuccess: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired
  }),
  withStateHandlers(
    () => ({
      originalDataUrl: '',
      imageRef: '',
      crop: {
        height: 50,
        width: 50,
        x: 0,
        y: 0
      },
      croppedPhotoUrls: [],
      cropperDialogOpen: false,
      fullPhotoDialogOpen: false,
      selectedPhotoIndex: 0,
      editingPhoto: false,
      disabledCropperButton: true
    }),
    {
      setCrop: () => crop => ({ crop, disabledCropperButton: false }),
      setImageRef: () => imageRef => ({ imageRef }),
      setStateAfterDropping: () => originalDataUrl => ({
        originalDataUrl,
        cropperDialogOpen: true,
        disabledCropperButton: true,
        editingPhoto: false
      }),
      setCropperDialogOpenAndselectedPhotoIndex: () => photoIndex => ({
        selectedPhotoIndex: photoIndex,
        cropperDialogOpen: true,
        disabledCropperButton: true,
        editingPhoto: true
      }),
      setFullPhotoDialogOpenAndselectedPhotoIndex: () => photoIndex => ({
        selectedPhotoIndex: photoIndex,
        fullPhotoDialogOpen: true
      }),
      setFullPhotoDialogOpen: () => fullPhotoDialogOpen => ({
        fullPhotoDialogOpen
      }),
      setCropperDialogOpen: () => cropperDialogOpen => ({
        cropperDialogOpen
      })
    }
  ),
  withHandlers({
    onDrop: ({ setStateAfterDropping, showError }) => acceptedFiles => {
      acceptedFiles.forEach(async file => {
        try {
          const result = await getDataUrlFromFile(file)
          setStateAfterDropping(result)
        } catch (error) {
          showError('Error cargando foto: ', error.message || error)
        }
      })
    },
    onImageLoaded: ({ setImageRef }) => image => {
      setImageRef(image)
    },
    onCropChange: ({ setCrop }) => (crop, pixelCrop) =>
      setCrop({ ...crop, pixelCrop }),
    cropPhoto: ({
      photos,
      crop,
      imageRef,
      selectedPhotoIndex,
      editingPhoto,
      showSuccess,
      showError,
      addImage,
      updateImage,
      setCropperDialogOpen
    }) => async () => {
      if (imageRef && crop.pixelCrop) {
        let croppedBlob

        try {
          croppedBlob = await cropImage(imageRef, crop.pixelCrop)
        } catch (error) {
          showError('Error recortando foto:', error.message || error)
          return ''
        }

        if (editingPhoto && photos[selectedPhotoIndex]) {
          window.URL.revokeObjectURL(photos[selectedPhotoIndex].croppedUrl)
        }

        const croppedUrl = window.URL.createObjectURL(croppedBlob)

        if (editingPhoto) {
          updateImage(selectedPhotoIndex, {
            originalDataUrl: imageRef.src,
            croppedUrl,
            croppedBlob
          })
        } else {
          addImage({
            originalDataUrl: imageRef.src,
            croppedUrl,
            croppedBlob
          })
        }

        setCropperDialogOpen(false)
        showSuccess('Foto recortada!')
      }
    },
    editPhoto: ({
      setCropperDialogOpenAndselectedPhotoIndex
    }) => photoIndex => () =>
      setCropperDialogOpenAndselectedPhotoIndex(photoIndex),
    showFullPhoto: ({
      setFullPhotoDialogOpenAndselectedPhotoIndex
    }) => photoIndex => () =>
      setFullPhotoDialogOpenAndselectedPhotoIndex(photoIndex),
    closeCropperDialog: ({ setCropperDialogOpen }) => () =>
      setCropperDialogOpen(false),
    closeFullPhotoDialog: ({ setFullPhotoDialogOpen }) => () =>
      setFullPhotoDialogOpen(false)
  }),
  withStyles(styles, { withTheme: true })
)
