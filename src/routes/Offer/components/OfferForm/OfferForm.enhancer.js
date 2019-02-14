import PropTypes from 'prop-types'
import {
  compose,
  setDisplayName,
  setPropTypes,
  withProps,
  withStateHandlers,
  withHandlers
} from 'recompose'
import { NEW_OFFER_FORM_NAME } from 'constants/formNames'
import {
  CLASSES,
  ITEM_TYPES,
  POST_TYPES,
  CLOTHES,
  CREATURE_MAX_LEVEL,
  ITEM_MAX_LEVEL
} from 'constants/entities'
import { withNotifications } from 'modules/notification'
import { UserIsAuthenticated } from 'utils/router'
import { withFormik } from 'formik'
import { withStyles } from '@material-ui/core/styles'
import styles from './OfferForm.styles'
import validationSchema from './OfferFom.validationSchema'
import { connect } from 'react-redux'
import { setImages } from 'modules/imageCropper/actions'

export default compose(
  setDisplayName('EnhancedOfferForm'),
  UserIsAuthenticated,
  withNotifications,
  connect(
    ({ imageCropper }) => ({ photos: imageCropper }),
    { setImages }
  ),
  setPropTypes({
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        originalDataUrl: PropTypes.string,
        croppedUrl: PropTypes.string,
        croppedBlob: PropTypes.object
      })
    ),
    showSuccess: PropTypes.func.isRequired,
    showError: PropTypes.func.isRequired,
    addOffer: PropTypes.func.isRequired // used by reduxForm
  }),
  withProps(() => ({
    offerClasses: CLASSES,
    offerItemTypes: ITEM_TYPES,
    offerTypes: POST_TYPES,
    offerClothes: CLOTHES,
    offerCreatureMaxLevel: CREATURE_MAX_LEVEL,
    offerItemMaxLevel: ITEM_MAX_LEVEL,
    steps: ['Sube tus fotos', 'Tipo de oferta', 'Título y descripción']
  })),
  withStateHandlers(
    ({ initialActiveStep = 0 }) => ({
      activeStep: initialActiveStep
    }),
    {
      setActiveStep: () => newStepValue => ({ activeStep: newStepValue })
    }
  ),
  withFormik({
    mapPropsToValues: () => ({
      title: '',
      description: '',
      offerType: '',
      itemClass: '',
      itemType: '',
      itemLevel: 0
    }),
    validationSchema,
    handleSubmit: async (
      values,
      {
        setSubmitting,
        props: {
          addOffer,
          photos,
          showSuccess,
          showError,
          setImages,
          activeStep,
          setActiveStep
        }
      }
    ) => {
      try {
        await addOffer(values, photos)
        setImages()
        showSuccess('Tu oferta fue creada!')
        setActiveStep(activeStep + 1)
      } catch (error) {
        showError('Oops', error.message || 'No se pudo crear tu oferta')
      }
      setSubmitting(false)
    },
    validateOnChange: false,
    displayName: NEW_OFFER_FORM_NAME
  }),
  withHandlers({
    handleReset: ({ setActiveStep }) => () => setActiveStep(0),
    disableNextStep: ({
      photos,
      activeStep,
      isValid,
      isSubmitting,
      errors
    }) => () => {
      switch (activeStep) {
        case 0:
          return photos.length === 0
        case 1:
          return (
            photos.length === 0 ||
            Boolean(errors.offerType) ||
            Boolean(errors.itemClass) ||
            Boolean(errors.itemType) ||
            Boolean(errors.itemLevel)
          )
        case 2:
          return photos.length === 0 || !isValid || isSubmitting
        default:
          return false
      }
    },
    handleNext: ({ setActiveStep, activeStep }) => () =>
      setActiveStep(activeStep + 1),
    handleBack: ({ setActiveStep, activeStep }) => () =>
      setActiveStep(activeStep - 1)
  }),
  withStyles(styles, { withTheme: true })
)
