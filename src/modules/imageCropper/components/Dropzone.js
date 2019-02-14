import React from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import ReactDropzone from 'react-dropzone'
import pure from 'recompose/pure'
import { Typography } from '@material-ui/core'

const Dropzone = ({ imagesNumber, onDrop, imagesMaxNumber, classes }) => (
  <div className={classes.dropzoneContainer}>
    <ReactDropzone
      onDrop={onDrop}
      multiple={false}
      accept="image/jpeg, image/png"
      maxSize={1 * 1024 * 1024}
      disabled={imagesNumber === imagesMaxNumber}>
      {({ getRootProps, getInputProps, isDragActive, isDragAccept }) => {
        return (
          <div {...getRootProps()} className={classes.dropzone}>
            <CloudUploadIcon
              className={classes.cloudUploadIcon}
              color={imagesNumber === imagesMaxNumber ? 'disabled' : 'primary'}
            />
            <input {...getInputProps()} />
            <Typography>
              {isDragAccept
                ? 'Oops, archivo rechazado!. Formato debe ser png/jpeg y el tamaño máximo por archivo es 4MB'
                : imagesNumber === imagesMaxNumber
                ? `Has alcanzado el número máximo de fotos (${imagesMaxNumber}).`
                : isDragActive
                ? 'Intenta arrastrar algunas fotos aquí, o haz clic para seleccionarlas.'
                : 'Arrastra tus fotos aquí (Solo png/jpg)'}
            </Typography>
          </div>
        )
      }}
    </ReactDropzone>
  </div>
)

export default pure(Dropzone)
