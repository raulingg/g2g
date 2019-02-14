import React from 'react'
import PropTypes from 'prop-types'
import ClearIcon from '@material-ui/icons/Clear'
import Fab from '@material-ui/core/Fab'
import CropIcon from '@material-ui/icons/Crop'
import CardMedia from '@material-ui/core/CardMedia'
import pure from 'recompose/pure'

const CroppedPhotos = ({
  photos,
  showFullPhoto,
  editPhoto,
  deletePhoto,
  classes
}) => (
  <div className={classes.photosContainer}>
    {photos.map((photo, index) => (
      <div className={classes.photoItem} key={`cropped-photos-${index}`}>
        <CardMedia
          component="img"
          className={classes.photo}
          image={photo.croppedUrl}
          onClick={() => showFullPhoto(index)}
          title="Preview"
        />
        <Fab
          size="small"
          className={classes.cropFabButton}
          onClick={() => editPhoto(index)}>
          <CropIcon />
        </Fab>
        <Fab
          size="small"
          onClick={() => deletePhoto(index)}
          className={classes.deleteFabButton}>
          <ClearIcon />
        </Fab>
      </div>
    ))}
  </div>
)

CroppedPhotos.defaultProps = {
  photos: []
}

CroppedPhotos.propTypes = {
  photos: PropTypes.array.isRequired,
  showFullPhoto: PropTypes.func.isRequired,
  editPhoto: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired
}

export default pure(CroppedPhotos)
