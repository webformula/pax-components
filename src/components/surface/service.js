import MDWUtils from '../../core/Utils.js';
import MDWTemplate from '../templates/service.js';

const templateTypes = [
  'panel',
  'sheetBottom',
  'sheetSide'
];

const animationTypes = [
  'scale',
  'height'
];

const animationOrigin = [
  'top',
  'center'
];

class MDWSurfaceInstance {
  constructor({ id, component, template, animation }) {
    this._id = id;
    this._component = component;
    this._template = template;
    this._animation = animation;
  }

  get id() {
    return this._id;
  }

  get component() {
    return this._component;
  }

  get element() {
    return this._element;
  }

  // TODO figure out open.close - open/close - add/remove
  async open() {
    const page = document.querySelector('mdw-page');
    if (page) page.insertAdjacentHTML('afterEnd', this._template);
    else document.body.insertAdjacentHTML('beforeend', this._template);
    this._element = document.querySelector(`#${this.id}`);

    switch (this.component) {
      case 'panel':
        this._element.setAnimation(this._animation);
        this.element.open();
        break;

      case 'sheetBottom':
        this.element.open();
        break;

      case 'sheetSide':
        this.element.open();
        break;
    }

    if (window._activeSurface) await window._activeSurface.close();

    window._activeSurface = this;
  }

  async close() {
    switch (this.component) {
      case 'panel':
        await this.element.close();
        break;

      case 'sheetBottom':
        await this.element.close();
        break;

      case 'sheetSide':
        await this.element.close();
        break;
    }

    this.element.remove();
    window._activeSurface = undefined;
  }
}


const MDWSurface = new class {
  constructor() {
    this._defaultMobileComponent = 'panel';
    this._defaultDesktopComponent = 'sheetSide';
  }

  setDefaultMobileComponent(component) {
    this._validateComponent(component);
    this._defaultMobileComponent = component;
  }

  setDefaultDesktopComponent(component) {
    this._validateComponent(component);
    this._defaultDesktopComponent = component;
  }


  async open({ template, templateData, animation, animationTarget, component, mobileComponent, desktopComponent }) {
    const instance = await this.create({ template, templateData, animation, animationTarget, component, mobileComponent, desktopComponent });
    instance.open();
  }

  async create({ template, templateData, animation, animationTarget, component, mobileComponent, desktopComponent }) {
    if (!component) component = this._autoSelectComponent(mobileComponent, desktopComponent);
    this._validateComponent(component);
    if (component === 'panel') {
      if (!animation) animation = this._autoSelectAnimation(animationTarget);
      this._validateAnimation(animation);
    }

    const id = MDWUtils.uid('surface');
    const templateString = MDWTemplate.isString(template) ? template : await MDWTemplate.get(template, templateData);

    let surfaceTemplate;
    switch (component) {
      case 'panel':
        surfaceTemplate = this._buildPanel({ id, animation, templateString });
        break;

      case 'sheetBottom':
        surfaceTemplate = this._buildSheetBottom({ id, templateString });
        break;

      case 'sheetSide':
        surfaceTemplate = this._buildSheetSide({ id, templateString });
        break;
    }

    return new MDWSurfaceInstance({
      id,
      component,
      template: surfaceTemplate,
      animation
    });
  }

  close() {
    if (window._activeSurface) window._activeSurface.close();
  }


  _autoSelectComponent(mobileComponent, desktopComponent) {
    if (MDWUtils.isMobile) return mobileComponent || this._defaultMobileComponent;
    return desktopComponent || this._defaultDesktopComponent;
  }

  _validateComponent(type) {
    if (!templateTypes.includes(type)) throw Error(`type must be one of these: ${templateTypes.join(', ')}`);
  }

  _autoSelectAnimation(target) {
    return {
      type: 'height',
      origin: 'center',
      fullscreen: true,
      target
    };
  }

  _validateAnimation(animation) {
    if (!animationTypes.includes(animation.type)) throw Error(`animation.type must be one of these: ${animationTypes.join(', ')}`);
    if (animation.origin && !animationOrigin.includes(animation.origin)) throw Error(`animation.type must be one of these: ${animationOrigin.join(', ')} or not defined`);
  }

  _buildPanel({ id, templateString }) {
    return /* html */`
      <mdw-panel id="${id}">
        ${templateString}
      </mdw-panel>
    `
  }

  _buildSheetBottom({ id, templateString }) {
    return /* html */`
      <mdw-sheet-bottom id="${id}">
        ${templateString}
      </mdw-sheet-bottom>
    `;
  }

  _buildSheetSide({ id, templateString }) {
    return /* html */`
      <mdw-sheet-side id="${id}" class="mdw-hide" mdw-modal mdw-no-backdrop>
        ${templateString}
      </mdw-sheet-side>
    `;
  }
};

window.MDWSurface = MDWSurface;

export default MDWSurface;
