/// <reference types="Cypress" />
import {
  createSelector,
  imageCropper as imageCropperHelper
} from '../../../utils'

describe('IMAGE CROPPER - SUCCESSES', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/offers/new')
    cy.login()
  })

  it('GIVEN one image less than 2 MB WHEN user drops it THEN the image is added', () => {
    imageCropperHelper.addImages()
    cy.get(createSelector('cropped-photo'))
  })

  it('GIVEN two image less than 2 MB WHEN user drops them THEN the images are added', () => {
    imageCropperHelper.addImages(2)
    cy.get(createSelector('cropped-photo')).should('have.length', 2)
  })

  it('GIVEN an images number equal to the max number allowed WHEN user drops them THEN all of them are added', () => {
    imageCropperHelper.addImages(imageCropperHelper.MAX_IMAGES_NUMBER)
    cy.get(createSelector('cropped-photo')).should(
      'have.length',
      imageCropperHelper.MAX_IMAGES_NUMBER
    )
  })

  it('GIVEN an cropped image  WHEN user clicks its delete button THEN the image is removed', () => {
    imageCropperHelper.addImages(1)
    imageCropperHelper.deleteImage(0) // delete de first one
    cy.get(createSelector('cropped-photo')).should('not.exist')
  })

  it('GIVEN several cropped images WHEN user removes one of them THEN the rest of the images remain', () => {
    imageCropperHelper.addImages(3)
    imageCropperHelper.deleteImage(1) // delete de second one
    cy.get(createSelector('cropped-photo')).should('have.length', 2)
  })

  it('GIVEN an cropped image WHEN user clicks its edit button THEN the cropper dialog is displayed', () => {
    imageCropperHelper.addImages(1)
    cy.get(createSelector('cropped-photo'))
      .eq(0)
      .find(createSelector('edit-button'))
      .click()
    cy.get('.ReactCrop__crop-selection')
  })

  it('GIVEN an cropped image WHEN user edits it THEN the image is replaced with the edited one', () => {
    imageCropperHelper.addImages(1)
    cy.get(createSelector('cropped-photo'))
      .eq(0)
      .find('img')
      .should('have.attr', 'src')
      .then(prevSrc => {
        imageCropperHelper.editImage(0)
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000) // waiting for changes from redux store
        cy.get(createSelector('cropped-photo'))
          .eq(0)
          .find('img')
          .should('have.attr', 'src')
          .then(currentSrc => expect(currentSrc).to.not.equal(prevSrc))
      })
  })

  it('GIVEN an cropped image WHEN user clicks it THEN the full image dialog is displayed', () => {
    imageCropperHelper.addImages(1)
    cy.get(createSelector('cropped-photo'))
      .eq(0)
      .click()

    cy.get(createSelector('full-image-dialog')).find('img')
  })
})
