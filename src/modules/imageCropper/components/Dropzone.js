import React from 'react'
import PropTypes from 'prop-types'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import ReactDropzone from 'react-dropzone'
import pure from 'recompose/pure'
import { Typography } from '@material-ui/core'

const Dropzone = ({ disabled, classes, ...restProps }) => (
  <div className={classes.dropzoneContainer}>
    <ReactDropzone {...restProps} disabled={disabled}>
      {({ getRootProps, getInputProps, isDragActive, isDragAccept }) => {
        return (
          <div
            {...getRootProps()}
            className={classes.dropzone}
            data-test="dropzone">
            <CloudUploadIcon
              className={classes.cloudUploadIcon}
              color={disabled ? 'disabled' : 'primary'}
            />
            <input {...getInputProps()} />
            <Typography>
              {isDragAccept
                ? 'Oops, archivo rechazado!. Formato debe ser png/jpeg y el tamaño máximo por archivo es 4MB'
                : disabled
                ? `Has alcanzado el número máximo de fotos.`
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

Dropzone.defaultProps = {
  maxSize: 1 * 1024 * 1024,
  accept: 'image/jpeg, image/png',
  multiple: false,
  disabled: false
}

Dropzone.propTypes = {
  maxSize: PropTypes.number,
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  onDrop: PropTypes.func.isRequired
}

export default pure(Dropzone)
