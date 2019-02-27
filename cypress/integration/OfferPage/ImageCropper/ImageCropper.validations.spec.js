/// <reference types="Cypress" />
import {
  createSelector,
  imageCropper as imageCropperHelper
} from '../../../utils'

describe('IMAGE CROPPER - VALIDATIONS', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/offers/new')
    cy.login()
  })

  it('GIVEN one image greater than 2 mb WHEN user drops it THEN the cropper dialog is not displayed', () => {
    cy.get(createSelector('dropzone')).dropFile(
      'files/image-greater-than-2mb.jpg'
    )
    cy.get('.ReactCrop__crop-selection').should('not.exist')
  })

  it('GIVEN a file format not allowed WHEN user drops it THEN the cropper dialog is not displayed', () => {
    cy.get(createSelector('dropzone')).dropFile('files/file-not-allowed.pdf')
    cy.get('.ReactCrop__crop-selection').should('not.exist')
  })

  it('GIVEN an images num greater than the max num allowed WHEN user drops them the images quantity allowed are just added', () => {
    imageCropperHelper.addImages(imageCropperHelper.MAX_IMAGES_NUMBER)
    cy.get(createSelector('dropzone')).dropFile('files/image-success.jpg')
    cy.get('.ReactCrop__crop-selection').should('not.exist')
    cy.get(createSelector('cropped-photo')).should(
      'have.length',
      imageCropperHelper.MAX_IMAGES_NUMBER
    )
    cy.contains('Has alcanzado el número máximo de fotos')
  })
})
