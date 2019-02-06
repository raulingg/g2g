import React from 'react'
import PropTypes from 'prop-types'
import OfferForm from '../OfferForm'

const OfferPage = ({ addOffer, classes }) => {
  return (
    <div className={classes.root}>
      <OfferForm addOffer={addOffer} />
    </div>
  )
}

OfferPage.propTypes = {
  addOffer: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default OfferPage
