import PropTypes from 'prop-types'
import React from 'react'
import StepperMaterialUI from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Step from '@material-ui/core/Step'
import pure from 'recompose/pure'

const Stepper = ({ steps, activeStep, classes }) => (
  <StepperMaterialUI
    activeStep={activeStep}
    alternativeLabel
    className={classes.stepper}>
    {steps.map(label => (
      <Step key={label}>
        <StepLabel
          StepIconProps={{
            classes: {
              root: classes.stepIcon,
              text: classes.stepIconText,
              active: classes.stepIconActive
            }
          }}>
          {label}
        </StepLabel>
      </Step>
    ))}
  </StepperMaterialUI>
)

Stepper.propTypes = {
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
}

export default pure(Stepper)
