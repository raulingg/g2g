import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ProviderDataForm from '../ProviderDataForm'

export const AccountForm = ({
  account,
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  isValid,
  classes
}) => (
  <form className={classes.root} onSubmit={handleSubmit}>
    <h4>Account</h4>
    <div className={classes.fields}>
      <TextField
        id="displayName"
        name="displayName"
        label="Nombre"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.displayName}
        error={touched.displayName && Boolean(errors.displayName)}
        helperText={errors.displayName}
      />
      <TextField
        id="email"
        label="Email"
        name="email"
        type="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
        error={touched.email && Boolean(errors.email)}
        helperText={errors.email}
      />
      <TextField
        id="avatarUrl"
        name="avatarUrl"
        label="Avatar Url"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.avatarUrl}
        error={touched.avatarUrl && Boolean(errors.avatarUrl)}
        helperText={errors.avatarUrl}
        fullWidth
      />
    </div>
    {!!account && !!account.providerData && (
      <div>
        <h4>Linked Accounts</h4>
        <ProviderDataForm providerData={account.providerData} />
      </div>
    )}
    <Button color="primary" type="submit" disabled={!isValid || isSubmitting}>
      {isSubmitting ? 'Saving' : 'Save'}
    </Button>
  </form>
)

AccountForm.propTypes = {
  account: PropTypes.object,
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  handleSubmit: PropTypes.func.isRequired // from enhancer (reduxForm - calls onSubmit)
}

export default AccountForm
