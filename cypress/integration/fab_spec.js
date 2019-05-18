describe('floating action button', function() {
  describe('position', function() {
    before(function () {
      cy.visit('http://localhost:8080/#/components/fab');
    });

    it('aligns top', function() {
      cy.get('#vertical-position > select').select('top');
      cy.get('mdw-fab#demoFAB').should('have.attr', 'position', 'top');
      cy.get('mdw-fab[position=top]#demoFAB').should('have.css', 'top', '20px');
    });

    it('aligns bottom', function() {
      cy.get('#vertical-position > select').select('bottom');
      cy.get('mdw-fab#demoFAB').should('have.attr', 'position', 'bottom');
      cy.get('mdw-fab[position=bottom]#demoFAB').should('have.css', 'bottom', '20px');
    });
  });

  describe('basic', function () {
    it('size check', function () {
      cy.get('mdw-fab#demoFAB').should('have.css', 'height', '56px');
      cy.get('mdw-fab#demoFAB').should('have.css', 'width', '56px');
    });

    it('theme check', function () {
      cy.get('mdw-fab#demoFAB').should('have.css', 'background-color', 'rgb(0, 137, 123)');
    });
  });

  describe('dense error', function () {
    it('size check', function () {
      cy.get('mdw-fab[dense]#dense-error').should('have.css', 'height', '40px');
      cy.get('mdw-fab[dense]#dense-error').should('have.css', 'width', '40px');
    });

    it('theme check', function () {
      cy.get('mdw-fab[dense]#dense-error').should('have.css', 'background-color', 'rgb(244, 67, 54)');
    });
  });
});
