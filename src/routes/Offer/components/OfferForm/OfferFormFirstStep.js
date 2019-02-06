import React from 'react'
import { ImageCropper } from 'modules/imageCropper'
import Paper from '@material-ui/core/Paper'

const OfferFormFirstStep = ({ classes }) => (
  <Paper className={classes.step}>
    <ImageCropper max={5} />
  </Paper>
)

export default OfferFormFirstStep
