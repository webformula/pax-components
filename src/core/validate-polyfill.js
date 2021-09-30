export default class {
  constructor(element, options = {
    valueParameter: 'value',
    valueType: 'String',
    validationMethod: () => { return true; },
    __dummy: 'true'
  }) {
    this.element = element;
    element.validationMessage = '';
    options = options || {};
    options.valueParameter = options.valueParameter || 'value';
    options.valueType = options.valueType || 'String';
    if (options.__dummy === true || !options.validationMethod) options.validationMethod = () => {
      if (options.valueType === 'Boolean') element.hasAttribute('required') ? element[options.valueParameter] === true : true;
      return element.hasAttribute('required') ? element[options.valueParameter] !== '' : true;
    };
    this.validationMethod = options.validationMethod;

    element.setCustomValidity = this.setCustomValidity.bind(this);
    element.reportValidity = this.reportValidity.bind(this);
    element.checkValidity = this.checkValidity.bind(this);

    const that = this;
    this.element.validity = new class ValidityState {
      get badInput() {
        return false;
      }

      get customError() {
        return that.element.validationMessage !== '';
      }

      get patternMismatch() {
        return false;
      }

      get rangeOverflow() {
        return false;
      }

      get rangeUnderflow() {
        return false;
      }

      get stepMismatch() {
        return false;
      }

      get tooLong() {
        return false;
      }

      get tooShort() {
        return false;
      }

      get typeMismatch() {
        return false;
      }

      get valid() {
        return that._validate();
      }

      get valueMissing() {
        return !that.element.value;
      }
    };
  }

  // mdw-select > select
  addChildWithValidation(element) {
    this.childElement = element;
    this.childElement.addEventListener('invalid', event => {
      const isValid = this._validate();
      this.element.classList.toggle('mdw-invalid', !isValid);
      this.element.validationMessage = this.childElement.validationMessage;
      this.element.dispatchEvent(new Event('invalid'));
    });
  }

  setCustomValidity(message = '') {
    if (this.childElement && this.childElement.setCustomValidity) {
      this.childElement.setCustomValidity(message);
    }

    this.element.validationMessage = message;
  }

  reportValidity() {
    let isValid = true;
    if (this.childElement && this.childElement.reportValidity) {
      isValid = this.childElement.reportValidity();
    } else {
      isValid = this._validate();
    }

    this.element.classList.toggle('mdw-invalid', !isValid);
    if (isValid === false) this.element.dispatchEvent(new Event('invalid'));
    return isValid
  }

  checkValidity() {
    return this._validate();
  }

  _validate() {
    if (this.childElement) return this.childElement.checkValidity();
    if (this.element.validationMessage !== '') return false;
    return this.validationMethod();
  }
}
