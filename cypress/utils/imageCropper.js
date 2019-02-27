import { createSelector } from '.'

export const MAX_IMAGES_NUMBER = 5

/**
 * Add images to set of cropped images
 *
 * @param {int} quantity - Number of images to add
 */
const addImages = (quantity = 1) => {
  for (let i = 1; i <= quantity; i++) {
    cy.get(createSelector('dropzone')).dropFile('files/image-success.jpg')
    cropImage()
  }
}

/**
 * Edit cropped image
 *
 * @param {int} croppedImageIndex
 */
const editImage = (croppedImageIndex = 0) => {
  cy.get(createSelector('cropped-photo'))
    .eq(croppedImageIndex)
    .find(createSelector('edit-button'))
    .click()
  cropImage()
}

/**
 * Delete one image from the set of cropped images
 *
 * @param {int} croppedImageIndex
 */
const deleteImage = (croppedImageIndex = 0) => {
  cy.get(createSelector('cropped-photo'))
    .eq(croppedImageIndex)
    .find(createSelector('delete-button'))
    .click()
}

const cropImage = () => {
  cy.get('.ReactCrop__crop-selection')
    .trigger('mousedown')
    .trigger('mousemove')
    .trigger('mouseup')

  cy.get('.ReactCrop')
    .siblings('button')
    .click()
}

export { deleteImage, addImages, cropImage, editImage }
