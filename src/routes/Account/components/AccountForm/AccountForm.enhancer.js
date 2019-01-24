import PropTypes from 'prop-types'
import { compose, setPropTypes } from 'recompose'
import { withStyles } from '@material-ui/core/styles'
import { ACCOUNT_FORM_NAME } from 'constants/formNames'
import * as Yup from 'yup'
import { withFormik } from 'formik'
import styles from './AccountForm.styles'

const validationSchema = Yup.object({
  email: Yup.string('Ingrese un email')
    .email('Ingrese un email válido')
    .required('Email es requerido'),
  displayName: Yup.string('Ingrese un nombre.')
    .strict(true)
    .required('Nombre es requerido.')
    .matches(/^[A-Za-z0-9 ]+$/, 'Nombre solo caracteres alfabéticos.')
    .trim()
})

export default compose(
  // set proptypes used in HOCs
  setPropTypes({
    onSubmit: PropTypes.func.isRequired // used by reduxForm
  }),
  // make the component a redux-form
  withFormik({
    mapPropsToValues: ({ account }) => ({
      email: account.email || '',
      displayName: account.displayName || '',
      avatarUrl: account.avatarUrl || ''
    }),
    // Custom sync validation
    validationSchema: validationSchema,
    handleSubmit: (values, { setSubmitting, props: { onSubmit } }) => {
      onSubmit(values).then(() => setSubmitting(false))
    },
    enableReinitialize: true,
    displayName: ACCOUNT_FORM_NAME
  }),
  // add styles as props
  withStyles(styles)
)
