describe('text-field', function() {
  describe('basic with helper text', function() {
    it('be hooked up to webcomponent', function() {
      cy.visit('http://localhost:8080/#/components/text-field');
      // mdw-upgraded is added on connectedCallback
      cy.get('#one').should('have.class', 'mdw-upgraded');
    });

    it('have correct elements', function() {
      cy.get('#one > input').should('exist');
      cy.get('#one > label').should('exist');
      cy.get('#one > mdw-textfield-helper').should('exist');
      cy.get('#one > mdw-textfield-helper > mdw-helper-text').should('exist');
      cy.get('#one > .line-ripple').should('exist');
    });

    it('have focus style', function() {
      cy.get('#one > input').focus();
      cy.get('#one > .line-ripple').should('have.css', 'opacity', '1');
      cy.get('#one > label').should('have.css', 'color', 'rgb(103, 58, 183)');
      cy.get('#one > label').should('have.css', 'transform', 'matrix(0.75, 0, 0, 0.75, 0, -9)');
    });

    it('loose style on blur', function() {
      cy.get('#one > input').blur();
      cy.get('#one > .line-ripple').should('have.css', 'opacity', '0');
      cy.get('#one > label').should('have.css', 'color', 'rgba(0, 0, 0, 0.6)');
    });

    it('have style when filled and blured', function() {
      cy.get('#one > input').type('hello');
      cy.get('#one > input').blur();
      cy.get('#one > .line-ripple').should('have.css', 'opacity', '0');
      // TODO check if this is correct
      cy.get('#one > label').should('have.css', 'color', 'rgb(103, 58, 183)');
      cy.get('#one > label').should('have.css', 'transform', 'matrix(0.75, 0, 0, 0.75, 0, -9)');
    });
  });

  describe('outlined', function() {
    it('have outline', function() {
      cy.get("#varient-select").then(el => {
        el[0].value = 'outlined';
      });
      cy.get('#two .outlined-leading').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.24)');
    });

    it('have outline focus style', function() {
      cy.get('#two > input').focus();
      cy.get('#two .outlined-leading').should('have.css', 'border-color', 'rgb(103, 58, 183)');
      cy.get('#two > label').should('have.css', 'color', 'rgb(103, 58, 183)');
      cy.get('#two > label').should('have.css', 'transform', 'matrix(0.75, 0, 0, 0.75, 0, -23.4)');
    });

    it('no outline focus style on blur', function() {
      cy.get('#two > input').blur();
      cy.get('#two .outlined-leading').should('have.css', 'border-color', 'rgba(0, 0, 0, 0.24)');
      cy.get('#two > label').should('have.css', 'color', 'rgb(103, 58, 183)');
    });

    it('have outline focus style when filled and blur', function() {
      cy.get('#two > input').type('hello');
      cy.get('#two > input').blur();
      cy.get('#two > label').should('have.css', 'color', 'rgb(103, 58, 183)');
      cy.get('#two > label').should('have.css', 'transform', 'matrix(0.75, 0, 0, 0.75, 0, -23.4)');
    });
  });

  describe('basic validation', function() {
    it('have red text', function() {
      cy.get('#validation-input').scrollIntoView();
      cy.get('#validation-input > label').should('have.css', 'color', 'rgb(244, 67, 54)');
      cy.get('#validation-input >mdw-textfield-helper > mdw-helper-text[validation]').should('have.css', 'opacity', '1');
      cy.get('#validation-input >mdw-textfield-helper > mdw-helper-text[persistent]').should('have.css', 'opacity', '0');
    });

    it('not have red text once fixed', function() {
      cy.get('#validation-input > input').type('hello');
      cy.get('#validation-input > label').should('have.css', 'color', 'rgb(103, 58, 183)');
      cy.get('#validation-input >mdw-textfield-helper > mdw-helper-text[validation]').should('have.css', 'opacity', '0');
      cy.get('#validation-input >mdw-textfield-helper > mdw-helper-text[persistent]').should('have.css', 'opacity', '1');
    });
  });
})
