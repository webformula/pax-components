describe('buttons', function() {
  describe('basic', function() {
    before(function () {
      cy.visit('http://localhost:8080/#/components/buttons');
    });

    it('has correct height', function() {
      cy.get('#basic').should('have.css', 'height', '36px');
    });

    it('has correct font', function() {
      cy.get('#basic').should('have.css', 'font-size', '14px');
    });

    it('has no background', function() {
      cy.get('#basic').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    });

    it('has text', function() {
      cy.get('#basic').contains('basic' );
    });

    it('has no shadow', function() {
      cy.get('#basic').should('have.css', 'box-shadow', 'none');
    });
  });

  describe('raised', function() {
    before(function () {
      cy.get('mdw-button[raised]#raised').scrollIntoView();
    });

    it('has background', function() {
      cy.get('mdw-button[raised]#raised').should('have.css', 'background-color', 'rgb(255, 255, 255)');
    });

    it('has shadow', function() {
      cy.get('mdw-button[raised]#raised').should('have.css', 'box-shadow');
    });
  });

  describe('outlined', function() {
    before(function () {
      cy.get('mdw-button[outlined]#outlined').scrollIntoView();
    });

    it('has border', function() {
      cy.get('mdw-button[outlined]#outlined').should('have.css', 'border-style', 'solid');
    });

    it('has no background', function() {
      cy.get('mdw-button[outlined]#outlined').should('have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    });

    it('has no shadow', function() {
      cy.get('mdw-button[outlined]#outlined').should('have.css', 'box-shadow', 'none');
    });
  });

  describe('outlined-dense', function() {
    before(function () {
      cy.get('mdw-button[dense]#outlined-dense').scrollIntoView();
    });

    it('has reduced height', function() {
      cy.get('mdw-button[dense]#outlined-dense').should('have.css', 'height', '32px');
    });

    it('has reduced font', function() {
      cy.get('mdw-button[dense]#outlined-dense').should('have.css', 'font-size', '13px');
    });
  });

  describe('shaped raised', function() {
    before(function () {
      cy.get('mdw-button[shaped]#shaped').scrollIntoView();
    });

    it('has border', function() {
      cy.get('mdw-button[shaped]#shaped').should('have.css', 'border-radius', '18px');
    });
  });

  describe('themeing', function() {
    before(function () {
      cy.get('mdw-button.primary[raised]#primary-raised').scrollIntoView();
    });

    it('has correct background color', function() {
      cy.get('mdw-button.primary[raised]#primary-raised').should('have.css', 'background-color', 'rgb(103, 58, 183)');
    });

    it('has correct background color', function() {
      cy.get('mdw-button.secondary[raised]#secondary-raised').should('have.css', 'background-color', 'rgb(0, 137, 123)');
    });

    it('has correct background color', function() {
      cy.get('mdw-button.error[raised]#error-raised').should('have.css', 'background-color', 'rgb(244, 67, 54)');
    });
  });
});
