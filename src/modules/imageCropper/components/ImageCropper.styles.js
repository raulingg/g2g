export default theme => ({
  dropzoneContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50px'
  },
  dropzone: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    minWidth: '250px',
    border: 'dashed #b8b5b5',
    borderRadius: '4px',
    padding: '10px',
    cursor: 'pointer',
    textAlign: 'center'
  },
  cloudUploadIcon: {
    fontSize: '75px'
  },
  photosContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  photoItem: {
    position: 'relative',
    maxHeight: '200px',
    background: '#000',
    '&:hover img': {
      opacity: '.5'
    },
    '&:not(:last-child)': {
      margin: theme.spacing.unit
    }
  },
  photo: {
    maxHeight: '200px',
    maxWidth: '250px',
    cursor: 'pointer',
    objectFit: 'cover',
    opacity: 1,
    '-webkit-transition': '.3s ease-in-out',
    transition: '.3s ease-in-out',
    borderRadius: theme.spacing.unit * 0.5
  },
  cropFabButton: {
    position: 'absolute',
    bottom: '0.5rem',
    left: '0.5rem'
  },
  deleteFabButton: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem'
  },
  cropperDialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fullPhotoDialog: {
    margin: 0,
    width: 'auto',
    height: 'auto',
    maxHeight: '80vh'
  }
})
