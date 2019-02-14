import { Loadable } from 'utils/components'
import { NEW_OFFER_PATH as path } from 'constants/paths'

export default {
  path,
  component: Loadable({
    loader: () =>
      import(/* webpackChunkName: 'Project new' */ './components/OfferPage')
  })
}
