import PropTypes from 'prop-types'
import { compose, setPropTypes } from 'recompose'
import { LOGIN_FORM_NAME } from 'constants/formNames'
import { withStyles } from '@material-ui/core/styles'
import styles from './LoginForm.styles'
import * as Yup from 'yup'
import { withFormik } from 'formik'

const validationSchema = Yup.object({
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
    loginWithCredentials: PropTypes.func.isRequired // called by handleSubmit
  }),

  withFormik({
    mapPropsToValues: () => ({
      email: '',
      password: '',
      showPassword: false
    }),
    // Custom sync validation
    validationSchema: validationSchema,
    handleSubmit: (values, { setSubmitting, props }) => {
      props.loginWithCredentials(values).then(() => setSubmitting(false))
    },
    displayName: LOGIN_FORM_NAME
  }),
  // Add styles as props.classes
  withStyles(styles)
)
