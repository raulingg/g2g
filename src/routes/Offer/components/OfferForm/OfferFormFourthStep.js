import React from 'react'
import PropTypes from 'prop-types'
import InputField from 'components/InputField'
import Paper from '@material-ui/core/Paper'
import InputAdornment from '@material-ui/core/InputAdornment'

const OfferFormFourthStep = ({
  classes,
  values,
  touched,
  errors,
  handleChangePriceFrom,
  handleBlur
}) => (
  <div className={classes.root}>
    <Paper className={classes.panel}>
      <InputField
        data-test="priceFromInput"
        name="priceFrom"
        label="Precio Desde"
        onChange={event => handleChangePriceFrom(event.target.value)}
        onBlur={handleBlur}
        values={values}
        touched={touched}
        errors={errors}
        className={classes.inputField}
        InputProps={{
          startAdornment: <InputAdornment position="start">S/ </InputAdornment>
        }}
      />
    </Paper>
  </div>
)

OfferFormFourthStep.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChangePriceFrom: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default OfferFormFourthStep
