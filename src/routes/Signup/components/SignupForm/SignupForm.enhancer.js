import PropTypes from 'prop-types'
import { compose, setPropTypes } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { SIGNUP_FORM_NAME } from 'constants/formNames'
import styles from './SignupForm.styles'
import { withFormik } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  username: Yup.string('Ingrese un username')
    .required('Username es requerido')
    .matches(/^[A-Za-z0-9]+$/, 'Username solo caracteres alfanuméricos.'),
  email: Yup.string('Ingrese un email')
    .email('Ingrese un email válido')
    .required('Email es requerido'),
  password: Yup.string('')
    .min(8, 'Contraseña debe contener al menos 8 caracteres')
    .required('Contraseña es requerida')
})

export default compose(
  // Set proptypes used in HOCs
  setPropTypes({
    signUpWithCredentials: PropTypes.func.isRequired // called by handleSubmit
  }),
  withFormik({
    mapPropsToValues: () => ({
      username: '',
      email: '',
      password: '',
      showPassword: false
    }),
    // Custom sync validation
    validationSchema: validationSchema,
    handleSubmit: (values, { setSubmitting, props }) => {
      props.signUpWithCredentials(values)
      setSubmitting(false)
    },
    displayName: SIGNUP_FORM_NAME
  }),
  // Add styles as props.classes
  withStyles(styles)
)
