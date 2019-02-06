import { IMAGE_CROPPER_ADD, IMAGE_CROPPER_UPDATE } from './actionTypes'

const imageCropperReducerDefaultState = []

const imageCropper = (state = imageCropperReducerDefaultState, action) => {
  switch (action.type) {
    case IMAGE_CROPPER_ADD:
      return [...state, action.payload]
    case IMAGE_CROPPER_UPDATE:
      return state.map((item, key) => {
        if (key === action.id) {
          return {
            ...item,
            ...action.updates
          }
        }
        return item
      })
    default:
      return state
  }
}

export default imageCropper
