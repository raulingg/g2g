import React from 'react'
import PropTypes from 'prop-types'
import ContentAddCircle from '@material-ui/icons/AddCircle'
import Paper from '@material-ui/core/Paper'

const iconSize = '6rem'
const iconStyle = { width: iconSize, height: iconSize }

const NewProjectTile = ({ onClick, classes }) => (
  <Paper
    className={classes.root}
    onClick={onClick}
    data-test="new-project-title">
    <ContentAddCircle style={iconStyle} />
  </Paper>
)

NewProjectTile.propTypes = {
  classes: PropTypes.object.isRequired, // from enhancer (withStyles)
  onClick: PropTypes.func.isRequired
}

export default NewProjectTile
