import React from 'react'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'

const InputField = ({
  name,
  values,
  errors,
  touched,
  onChange,
  onBlur,
  ...restProps
}) => (
  <TextField
    id={name}
    name={name}
    onChange={onChange}
    onBlur={onBlur}
    value={values[name]}
    error={touched[name] && Boolean(errors[name])}
    helperText={errors[name]}
    {...restProps}
  />
)

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired
}

export default InputField
