import React from 'react'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import InputField from 'components/InputField'

const OfferFormThirdStep = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  classes
}) => (
  <div className={classes.root}>
    <Paper className={classes.panel}>
      <InputField
        name="title"
        label="Título"
        onChange={handleChange}
        onBlur={handleBlur}
        values={values}
        touched={touched}
        errors={errors}
        fullWidth
        className={classes.inputField}
      />
      <InputField
        name="description"
        label="Descripción"
        onChange={handleChange}
        onBlur={handleBlur}
        values={values}
        touched={touched}
        errors={errors}
        fullWidth
        multiline
        rows={5}
        className={classes.inputField}
      />
    </Paper>
  </div>
)

OfferFormThirdStep.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default OfferFormThirdStep
