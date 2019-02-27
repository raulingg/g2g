/// <reference types="Cypress" />
import { createSelector } from '../../utils'

// First step - drag and drop image
const fillFirstStepAndNext = (imagesNumber = 1) => {
  for (let i = 1; i <= imagesNumber; i++) {
    cy.get(createSelector('dropzone')).dropFile('files/image-success.jpg')
    cy.get('.ReactCrop__crop-selection')
      .trigger('mousedown')
      .trigger('mousemove')
      .trigger('mouseup')

    cy.get('.ReactCrop')
      .siblings('button')
      .click()
  }

  cy.get(createSelector('nextButton')).click()
}

const fillSecondStepAndNext = ({
  offerType = 'SET',
  itemType = 'ARMOR',
  itemClass = 'MAGE',
  itemLevel = '10'
}) => {
  cy.get(createSelector('OfferTypeInput')).click()
  cy.get(`li[data-value=${offerType}]`).click()

  if (offerType === 'ONLY') {
    cy.get(createSelector('itemTypeInput')).click()
    cy.get(`li[data-value=${itemType}]`).click()

    if (!['CREATURE', 'RING', 'NECKLACE'].includes(itemType)) {
      cy.get(createSelector('itemClassInput')).click()
      cy.get(`li[data-value=${itemClass}]`).click()
    }

    cy.get(createSelector('itemLevelInput')).click()
    cy.get(`li[data-value=${itemLevel}]`).click()
  }

  cy.get(createSelector('nextButton'))
    .focus()
    .click()
}

// Third offer - put a title and description
const fillThirdStepAndNext = (
  title = 'My title',
  description = 'This is my description with twenty characters!'
) => {
  cy.get(createSelector('titleInput'))
    .find('input')
    .type(title)
  cy.get(createSelector('descriptionInput'))
    .find('textarea')
    .type(description)
  cy.get(createSelector('nextButton'))
    .focus()
    .click()
}

// Fourth step - put a price from
const fillFourthStepAndNext = (price = '100.00') => {
  cy.get(createSelector('priceFromInput'))
    .find('input')
    .clear()
    .type(price)
  // Send Form
  cy.get(createSelector('nextButton'))
    .focus()
    .click()
}

const containSuccessMessage = (
  message = 'Tu oferta ha sido creado exitosamente!'
) => cy.contains(message)

describe('Offer Page', () => {
  beforeEach(() => {
    cy.logout()
    cy.visit('/offers/new')
    cy.login()
  })

  describe('SUBMITS', () => {
    it('GIVEN offer data with 3 images WHEN user creates an offer THEN it is created successfully', () => {
      fillFirstStepAndNext(3)
      fillSecondStepAndNext({})
      fillThirdStepAndNext()
      fillFourthStepAndNext()
      containSuccessMessage()
    })

    describe('WITH OFFER TYPE EQUAL TO ONLY (ITEM)', () => {
      it('GIVEN an item type equal to helmet WHEN user creates an offer THEN it is created successfully', () => {
        fillFirstStepAndNext()
        fillSecondStepAndNext({ offerType: 'ONLY', itemType: 'HELMET' })
        fillThirdStepAndNext()
        fillFourthStepAndNext('99.99')
        containSuccessMessage()
      })

      it('GIVEN an item type equal to creature WHEN user creates an offer THEN it is created successfully', () => {
        fillFirstStepAndNext(2)
        fillSecondStepAndNext({
          offerType: 'ONLY',
          itemType: 'CREATURE',
          itemLevel: '99'
        })
        fillThirdStepAndNext()
        fillFourthStepAndNext('500.00')
        containSuccessMessage()
      })
    })

    describe('WITH OFFER TYPE DIFFERENT FROM ONLY (SET, ACCOUNT,...)', () => {
      it('GIVEN an offer type equals set fields WHEN user creates an offer THEN it is created successfully', () => {
        fillFirstStepAndNext()
        fillSecondStepAndNext('SET')
        fillThirdStepAndNext()
        fillFourthStepAndNext()
        containSuccessMessage()
      })
    })
  })

  describe('VALIDATIONS', () => {
    it('WHEN users visits offer form THEN it shows first step active', () => {
      cy.contains('Sube tus fotos').should('exist')
      cy.get(createSelector('firstStep')).should('exist')
    })

    it('GIVEN no image WHEN user is at first step THEN next button is disabled', () => {
      cy.get(createSelector('nextButton'))
        .focus()
        .should('be.disabled')
    })

    it('GIVEN a description less than 20 characters WHEN user fills description input THEN next button is still disabled', () => {
      fillFirstStepAndNext()
      fillSecondStepAndNext({})
      // Third offer - put a title and description
      cy.get(createSelector('titleInput'))
        .find('input')
        .type('My test offer')
      cy.get(createSelector('descriptionInput'))
        .find('textarea')
        .type('short description')
      cy.get(createSelector('nextButton'))
        .focus()
        .should('be.disabled')
    })

    it('GIVEN a title is empty WHEN user fills title input THEN next button is still disabled', () => {
      fillFirstStepAndNext()
      fillSecondStepAndNext({})
      // Third offer - put a title and description
      cy.get(createSelector('titleInput'))
        .find('input')
        .clear()
      cy.get(createSelector('descriptionInput'))
        .find('textarea')
        .type('This is my description with twenty characters')
      cy.get(createSelector('nextButton'))
        .focus()
        .should('be.disabled')
    })

    it('GIVEN a no-numeric price WHEN user fills price input THEN next button follows disabled and price input is empty', () => {
      fillFirstStepAndNext()
      fillSecondStepAndNext({})
      fillThirdStepAndNext()
      // Fourth step - put a price from
      cy.get(createSelector('priceFromInput'))
        .find('input')
        .clear()
        .type('ssddsdsds')
        .should('be.empty')

      cy.get(createSelector('nextButton'))
        .focus()
        .should('be.disabled')
    })

    it('GIVEN a number with more 2 decimals WHEN user fills price input THEN price input shows just 2 decimals', () => {
      fillFirstStepAndNext()
      fillSecondStepAndNext({})
      fillThirdStepAndNext()
      // Fourth step - put a price from
      cy.get(createSelector('priceFromInput'))
        .find('input')
        .clear()
        .type('500.235')
        .should('have.value', '500.23')
    })
  })
})
