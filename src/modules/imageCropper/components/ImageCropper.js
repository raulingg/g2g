import React from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import DoneIcon from '@material-ui/icons/Done'
import Dialog from '@material-ui/core/Dialog'
import CardMedia from '@material-ui/core/CardMedia'
import Cropper from 'react-image-crop'
import CroppedPhotos from './CroppedPhotos'
import 'react-image-crop/dist/ReactCrop.css'
import Dropzone from './Dropzone'

const ImageCropper = ({
  photos,
  max,
  crop,
  originalDataUrl,
  selectedPhotoIndex,
  editingPhoto,
  cropperDialogOpen,
  disabledCropperButton,
  fullPhotoDialogOpen,
  onDrop,
  onImageLoaded,
  onCropChange,
  cropPhoto,
  showFullPhoto,
  editPhoto,
  deletePhoto,
  closeCropperDialog,
  closeFullPhotoDialog,
  classes
}) => (
  <React.Fragment>
    <Dropzone
      maxSize={2 * 1024 * 1024}
      disabled={photos.length === max}
      onDrop={onDrop}
      classes={classes}
    />
    <CroppedPhotos
      photos={photos}
      showFullPhoto={showFullPhoto}
      editPhoto={editPhoto}
      deletePhoto={deletePhoto}
      classes={classes}
    />

    {/* Full Image Dialog starts */}
    <Dialog
      data-test="full-image-dialog"
      maxWidth="xl"
      onClose={closeFullPhotoDialog}
      open={photos.length > 0 && fullPhotoDialogOpen}
      aria-labelledby="simple-dialog-title">
      {Boolean(photos[selectedPhotoIndex]) && (
        <CardMedia
          component="img"
          className={classes.fullPhotoDialog}
          src={photos[selectedPhotoIndex].croppedUrl}
        />
      )}
    </Dialog>
    {/* Full image Dialog ends */}

    {/* Cropper Dialog starts */}
    <Dialog
      maxWidth="xl"
      onClose={closeCropperDialog}
      open={cropperDialogOpen}
      aria-labelledby="simple-dialog-title">
      <div className={classes.cropperDialog}>
        <Cropper
          className={classes.fullPhotoCard}
          src={
            editingPhoto
              ? photos[selectedPhotoIndex].originalDataUrl
              : originalDataUrl
          }
          crop={crop}
          keepSelection={true}
          onImageLoaded={onImageLoaded}
          onChange={onCropChange}
        />
        <IconButton
          variant="contained"
          color="primary"
          onClick={cropPhoto}
          title="Ok"
          disabled={disabledCropperButton}>
          <DoneIcon />
        </IconButton>
      </div>
    </Dialog>
    {/* Cropper Dialog ends */}
  </React.Fragment>
)

ImageCropper.defaultProps = {
  max: 5,
  photos: [],
  originalPhotoSources: [],
  selectedPhotoIndex: 0,
  disabledCropperButton: true
}

ImageCropper.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      originalDataUrl: PropTypes.string,
      croppedUrl: PropTypes.string,
      croppedBlob: PropTypes.object
    })
  ).isRequired,
  max: PropTypes.number,
  crop: PropTypes.object.isRequired,
  selectedPhotoIndex: PropTypes.number.isRequired,
  editingPhoto: PropTypes.bool.isRequired,
  disabledCropperButton: PropTypes.bool.isRequired,
  fullPhotoDialogOpen: PropTypes.bool.isRequired,
  cropperDialogOpen: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  onImageLoaded: PropTypes.func.isRequired,
  onCropChange: PropTypes.func.isRequired,
  cropPhoto: PropTypes.func.isRequired,
  showFullPhoto: PropTypes.func.isRequired,
  editPhoto: PropTypes.func.isRequired,
  closeCropperDialog: PropTypes.func.isRequired,
  closeFullPhotoDialog: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired // from enhancer (withStyles)
}

export default ImageCropper
