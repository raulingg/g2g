import React from 'react'
import PropTypes from 'prop-types'
import Stepper from '@material-ui/core/Stepper'
import StepLabel from '@material-ui/core/StepLabel'
import Step from '@material-ui/core/Step'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import OfferFormFirstStep from './OfferFormFirstStep'
import OfferFormSecondStep from './OfferFormSecondStep'
import OfferFormThirdStep from './OfferFormThirdStep'

const OfferForm = ({
  steps,
  activeStep,
  offerClasses,
  offerItemTypes,
  offerTypes,
  offerClothes,
  offerItemMaxLevel,
  offerCreatureMaxLevel,
  disableNextStep,
  handleReset,
  handleBack,
  handleNext,
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  classes
}) => {
  const getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return <OfferFormFirstStep classes={classes} />
      case 1:
        return (
          <OfferFormSecondStep
            offerClasses={offerClasses}
            offerTypes={offerTypes}
            offerItemTypes={offerItemTypes}
            offerClothes={offerClothes}
            offerItemMaxLevel={offerItemMaxLevel}
            offerCreatureMaxLevel={offerCreatureMaxLevel}
            values={values}
            touched={touched}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            classes={classes}
          />
        )
      case 2:
        return (
          <OfferFormThirdStep
            values={values}
            touched={touched}
            errors={errors}
            handleChange={handleChange}
            handleBlur={handleBlur}
            classes={classes}
          />
        )
      default:
        return 'Uknown stepIndex'
    }
  }

  return (
    <div className={classes.root}>
      <Stepper
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
      </Stepper>
      <div className={classes.stepContainer}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              {getStepContent(activeStep)}

              <div className={classes.actionButtonContainer}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}>
                  Atrás
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    activeStep !== steps.length - 1 ? handleNext : handleSubmit
                  }
                  disabled={disableNextStep()}>
                  {activeStep === steps.length - 1
                    ? isSubmitting
                      ? '...Cargando'
                      : 'Finalizar'
                    : 'Siguiente'}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

OfferForm.propTypes = {
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired // from enhancer (withStyles)
}

export default OfferForm
