import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import EmailIcon from '@material-ui/icons/Email'
import PersonIcon from '@material-ui/icons/Person'

const SignupForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  setFieldValue,
  handleBlur,
  handleSubmit,
  isValid,
  classes
}) => {
  const _handleClickShowPassword = showPassword => () => {
    setFieldValue('showPassword', !showPassword)
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.username}
        error={touched.username && Boolean(errors.username)}
        helperText={errors.username}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled>
                <PersonIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <TextField
        id="email"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        error={touched.email && Boolean(errors.email)}
        helperText={errors.email}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton disabled>
                <EmailIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <TextField
        id="password"
        name="password"
        type={values.showPassword ? 'text' : 'password'}
        label="Password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.password && Boolean(errors.password)}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Toggle password visibility"
                onClick={_handleClickShowPassword(values.showPassword)}>
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <div className={classes.submit}>
        <Button
          color="primary"
          type="submit"
          variant="contained"
          disabled={!isValid || isSubmitting}>
          {isSubmitting ? 'Loading' : 'Sign Up'}
        </Button>
      </div>
    </form>
  )
}

SignupForm.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm - calls onSubmit)
}

export default SignupForm
