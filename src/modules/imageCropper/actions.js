import { IMAGE_CROPPER_ADD, IMAGE_CROPPER_UPDATE } from './actionTypes'

export const addImage = payload => ({ type: IMAGE_CROPPER_ADD, payload })
export const updateImage = (id, updates) => ({
  type: IMAGE_CROPPER_UPDATE,
  id,
  updates
})
