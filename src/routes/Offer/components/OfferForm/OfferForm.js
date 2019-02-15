import React from 'react'
import PropTypes from 'prop-types'
import DoneIcon from '@material-ui/icons/Done'
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import OfferFormFirstStep from './OfferFormFirstStep'
import OfferFormSecondStep from './OfferFormSecondStep'
import OfferFormThirdStep from './OfferFormThirdStep'
import OfferFormFourthStep from './OfferFormFourthStep'
import Stepper from './Stepper'
import { Link as RouterLink } from 'react-router-dom'
import { ACCOUNT_PATH } from 'constants/paths'

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
  handleBack,
  handleNext,
  values,
  touched,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleChangePriceFrom,
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
      case 3:
        return (
          <OfferFormFourthStep
            values={values}
            touched={touched}
            errors={errors}
            handleBlur={handleBlur}
            classes={classes}
            handleChangePriceFrom={handleChangePriceFrom}
          />
        )
      default:
        return 'Uknown stepIndex'
    }
  }

  return (
    <div className={classes.root}>
      <Stepper steps={steps} activeStep={activeStep} classes={classes} />
      <div className={classes.stepContainer}>
        {activeStep === steps.length ? (
          <div className={classes.successContainer}>
            <Typography variant="h5" gutterBottom>
              Tu oferta ha sido creado exitosamente!
            </Typography>
            <DoneIcon
              color="primary"
              fontSize="large"
              className={classes.doneIcon}
            />
            <Typography gutterBottom>
              <Link component={RouterLink} to={ACCOUNT_PATH}>
                Regresar
              </Link>
            </Typography>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}

OfferForm.propTypes = {
  steps: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired // from enhancer (withStyles)
}

export default OfferForm
