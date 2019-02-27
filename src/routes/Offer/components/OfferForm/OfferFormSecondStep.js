import React from 'react'
import PropTypes from 'prop-types'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import InputField from 'components/InputField'

const OfferFormSecondStep = ({
  offerClasses,
  offerItemTypes,
  offerTypes,
  offerClothes,
  offerItemMaxLevel,
  offerCreatureMaxLevel,
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  classes
}) => (
  <div className={classes.root}>
    <Paper className={classes.panel}>
      <h3>Tipo de oferta</h3>
      <InputField
        data-test="OfferTypeInput"
        name="offerType"
        select
        label="Tipo de oferta"
        onChange={handleChange}
        onBlur={handleBlur}
        values={values}
        touched={touched}
        errors={errors}
        fullWidth
        className={classes.inputField}>
        {Object.keys(offerTypes).map(key => (
          <MenuItem key={key} value={key} data-test={`offerTypeOption-${key}`}>
            {offerTypes[key]}
          </MenuItem>
        ))}
      </InputField>
    </Paper>
    {values.offerType === 'ONLY' && (
      <Paper className={classes.panel}>
        <h3>Datos sobre el item</h3>
        <div className={classes.itemSelectGroup}>
          <TextField
            data-test="itemTypeInput"
            id="itemType"
            name="itemType"
            select
            label="Tipo de item"
            value={values.itemType}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.itemType && Boolean(errors.itemType)}
            helperText={errors.itemType}
            className={classes.selectField}>
            {Object.keys(offerItemTypes).map(key => (
              <MenuItem key={key} value={key}>
                {offerItemTypes[key]}
              </MenuItem>
            ))}
          </TextField>
          {offerClothes.hasOwnProperty(values.itemType) && (
            <TextField
              data-test="itemClassInput"
              id="itemClass"
              name="itemClass"
              select
              label="Clase"
              value={values.itemClass}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.itemClass && Boolean(errors.itemClass)}
              helperText={errors.itemClass}
              className={classes.selectField}>
              {Object.keys(offerClasses).map(key => (
                <MenuItem key={key} value={key}>
                  {offerClasses[key]}
                </MenuItem>
              ))}
            </TextField>
          )}
          <TextField
            data-test="itemLevelInput"
            id="itemLevel"
            name="itemLevel"
            select
            label="Level"
            value={values.itemLevel}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.itemLevel && Boolean(errors.itemLevel)}
            helperText={errors.itemLevel}
            className={classes.selectField}>
            {Array.from(
              Array(
                values.itemType === 'CREATURE'
                  ? offerCreatureMaxLevel
                  : offerItemMaxLevel
              ).keys()
            ).map(level => (
              <MenuItem key={level} value={level}>
                +{level}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </Paper>
    )}
  </div>
)

OfferFormSecondStep.propTypes = {
  offerClasses: PropTypes.object.isRequired,
  offerItemTypes: PropTypes.object.isRequired,
  offerTypes: PropTypes.object.isRequired,
  offerClothes: PropTypes.object.isRequired,
  offerCreatureMaxLevel: PropTypes.number.isRequired,
  offerItemMaxLevel: PropTypes.number.isRequired,
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default OfferFormSecondStep
