import { compose, withHandlers } from 'recompose'
import { withStore } from 'utils/components'
import * as actions from '../actions'

const withNotifications = compose(
  withStore,
  withHandlers({
    showError: ({ store }) => err => actions.showError(err)(store.dispatch),
    showSuccess: ({ store }) => err => actions.showSuccess(err)(store.dispatch),
    dismissNotification: ({ store }) => id =>
      store.dispatch(actions.dismissNotification(id))
  })
)

export default withNotifications
