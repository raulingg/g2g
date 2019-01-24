import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'
import { LOGIN_PATH } from 'constants/paths'
import SignupForm from '../SignupForm'

const SignupPage = ({ signUpWithCredentials, googleLogin, classes }) => (
  <div className={classes.root}>
    <Paper className={classes.panel}>
      <SignupForm signUpWithCredentials={signUpWithCredentials} />
    </Paper>
    <div className={classes.orLabel}>or</div>
    <div className={classes.providers}>
      <GoogleButton onClick={googleLogin} />
    </div>
    <div className={classes.login}>
      <span className={classes.loginLabel}>Already have an account?</span>
      <Link className={classes.loginLink} to={LOGIN_PATH}>
        Login
      </Link>
    </div>
  </div>
)

SignupPage.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  signUpWithCredentials: PropTypes.func.isRequired, // from enhancer (withHandlers)
  googleLogin: PropTypes.func.isRequired // from enhancer (withHandlers)
}

export default SignupPage
