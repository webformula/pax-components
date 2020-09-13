import MDWUtils from '../../core/Utils.js';
import MDWTemplate from '../templates/service.js';

const templateTypes = [
  'dialog',
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
  'top left',
  'top right',
  'top center',
  'bottom',
  'bottom left',
  'bottom right',
  'bottom center',
  'right',
  'left',
  'center',
  'center center'
];

class MDWSurfaceInstance {
  constructor({ id, component, template, position, animation, anchorElement }) {
    this._id = id;
    this._component = component;
    this._template = template;
    this._animation = animation;
    this._anchorElement = anchorElement;
    this._position = position;

    this.bound_onPanelClose = this._onPanelClose.bind(this);
    this.bound_onSheetClose = this._onSheetClose.bind(this);
    this.bound_onDialogClose = this._onDialogClose.bind(this);
  }

  get id() {
    return this._id;
  }

  get component() {
    return this._component;
  }

  // set element(value) {
  //   this._element = value;
  // }
  get element() {
    return this._element;
  }

  // TODO figure out open.close - open/close - add/remove
  async open() {
    document.body.insertAdjacentHTML('beforeend', this._template);
    this._element = document.querySelector(`#${this.id}`);

    switch (this.component) {
      case 'dialog':
        this.element.open();
        this.element.addEventListener('close', this.bound_onDialogClose);
        break;

      case 'panel':
        // prep animation
        if (this._animation) this.element.setAnimation(this._animation);

        // quick open only if specifically false
        // if left undefined the animation will be defaulted
        if (this._animation === false) {
          this.element.quickOpen = true;
        }

        // anchor to element
        if (this._anchorElement && this._anchorElement instanceof HTMLElement) {
          if (this._animation && this._animation.hoistToBody === false) return;
          this.element.hoistToBody(this._anchorElement);
        }

        // anchor element for positioning
        if (this._anchorElement) {
          this.element.anchored();
        }

        if (this._position) this.element.setPosition(this._position);
        this.element.open();
        this.element.addEventListener('MDWPanel:closed', this.bound_onPanelClose);
        break;

      case 'sheetBottom':
        this.element.open();
        this.element.addEventListener('MDWSheet:closed', this.bound_onSheetClose);
        break;

      case 'sheetSide':
        this.element.open();
        this.element.addEventListener('MDWSheet:closed', this.bound_onSheetClose);
        break;
    }

    if (window._activeSurface) await window._activeSurface.close();

    window._activeSurface = this;

    return this.element;
  }

  async close() {
    switch (this.component) {
      case 'dialog':
        await this.element.close();
        break;
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

    this.destroy();
  }

  // remove the panel and disconnect its listeners with a closing animation
  destroy() {
    if (this.element) return;

    switch (this.component) {
      case 'dialog':
        this.element.removeEventListener('close', this.bound_onDialogClose);
        break;
      case 'panel':
        this.element.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
        break;
      case 'sheetBottom':
        this.element.removeEventListener('MDWSheet:closed', this.bound_onSheetClose);
        break;
      case 'sheetSide':
        this.element.removeEventListener('MDWSheet:closed', this.bound_onSheetClose);
        break;
    }

    this.element.remove();
    window._activeSurface = undefined;
  }

  _onPanelClose() {
    this.element.removeEventListener('MDWPanel:closed', this.bound_onPanelClose);
    this.element.remove();
    window._activeSurface = undefined;
    this._element = undefined;
  }

  _onSheetClose() {
    this.element.removeEventListener('MDWSheet:closed', this.bound_onSheetClose);
    this.element.remove();
    window._activeSurface = undefined;
    this._element = undefined;
  }

  _onDialogClose() {
    this.element.removeEventListener('close', this.bound_onDialogClose);
    this.element.remove();
    window._activeSurface = undefined;
    this._element = undefined;
  }
}



// Instance that generates MDWSurfaceInstance instances
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


  async open({
    template,
    templateData,
    position,
    animation,
    anchorElement,
    component,
    classes,
    mobileComponent,
    desktopComponent,
    scrollPanelWidthPage = false
  }) {
    const instance = await this.create({
      template,
      templateData,
      position,
      animation,
      component,
      classes,
      mobileComponent,
      desktopComponent,
      scrollPanelWidthPage
    });
    instance.open();
    return instance;
  }

  async create({
    template,
    templateData,
    position,
    animation,
    anchorElement,
    component,
    classes,
    mobileComponent,
    desktopComponent,
    scrollPanelWidthPage = false
  }) {
    if (!component) component = this._autoSelectComponent(mobileComponent, desktopComponent);
    this._validateComponent(component);
    if (component === 'panel') {
      if (!animation) animation = this._autoSelectAnimation();
      if (animation) this._validateAnimation(animation);
    }

    const id = MDWUtils.uid('surface');
    const templateString = MDWTemplate.isString(template) ? template : await MDWTemplate.get(template, templateData);

    let surfaceTemplate;
    switch (component) {
      case 'dialog':
        surfaceTemplate = this._buildDialog({
          id,
          templateString,
          classes
        });
        break;

      case 'panel':
        surfaceTemplate = this._buildPanel({
          id,
          position,
          templateString,
          classes,
          scrollPanelWidthPage
        });
        break;

      case 'sheetBottom':
        surfaceTemplate = this._buildSheetBottom({
          id,
          templateString,
          classes
        });
        break;

      case 'sheetSide':
        surfaceTemplate = this._buildSheetSide({ id, templateString, classes });
        break;
    }

    return new MDWSurfaceInstance({
      id,
      component,
      animation,
      anchorElement,
      position,
      template: surfaceTemplate
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

  _autoSelectAnimation() {
    return {
      type: 'height',
      origin: 'center',
      fullscreen: true,
      hoistToBody: false
    };
  }

  _validateAnimation(animation) {
    if (!animationTypes.includes(animation.type)) throw Error(`animation.type must be one of these: ${animationTypes.join(', ')}`);
    if (animation.origin && !animationOrigin.includes(animation.origin)) throw Error(`animation.type must be one of these: ${animationOrigin.join(', ')} or not defined`);
  }

  _buildDialog({ id, templateString, classes }) {
    return /* html */`
      <mdw-dialog id="${id}">
        <mdw-panel position="center center" class="${classes || ''}">
          ${templateString}
        </mdw-panel>
      </mdw-dialog>
    `;
  }

  _buildPanel({ id, position, templateString, classes, scrollPanelWidthPage }) {
    return /* html */`
      <mdw-panel
        id="${id}"
        ${position ? `mdw-position="${position}"` : ''}
        ${scrollPanelWidthPage ? `mdw-scroll-with-page` : ''}
        class="${classes || ''}"
      >
        ${templateString}
      </mdw-panel>
    `
  }

  _buildSheetBottom({ id, templateString, classes }) {
    return /* html */`
      <mdw-sheet-bottom id="${id}" mdw-modal class="${classes || ''}">
        ${!templateString.includes('<mdw-header>') ? '<mdw-header></mdw-header>' : ''}
        ${templateString}
      </mdw-sheet-bottom>
    `;
  }

  _buildSheetSide({ id, templateString, classes }) {
    return /* html */`
      <mdw-sheet-side id="${id}" class="mdw-hide ${classes || ''}" mdw-modal mdw-no-backdrop>
        ${templateString}
      </mdw-sheet-side>
    `;
  }
};

window.MDWSurface = MDWSurface;

export default MDWSurface;
