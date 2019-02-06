export default theme => ({
  root: {
    ...theme.flexColumnCenter,
    height: '100%',
    width: '100%',
    fontWeight: 400,
    paddingTop: '1.5rem'
  },
  panel: {
    justifyContent: 'center',
    flexGrow: 1,
    padding: '2.5rem',
    marginBottom: theme.spacing.unit * 3
  },
  itemSelectGroup: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  inputField: {
    margin: theme.spacing.unit * 2
  },
  selectField: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  stepper: {
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginBottom: theme.spacing.unit * 3,
    background: 'none'
  },
  stepContainer: {
    justifyContent: 'flex-start',
    width: '75%',
    height: '75%'
  },
  step: {
    padding: theme.spacing.unit * 3,
    marginBottom: '50px'
  },
  stepIcon: {
    fontSize: '36px'
  },
  stepIconText: {
    fontSize: '16px'
  },
  stepIconActive: {
    fontSize: '50px'
  },
  actionButtonContainer: {
    textAlign: 'right'
  },
  backButton: {
    marginRight: theme.spacing.unit
  }
})
