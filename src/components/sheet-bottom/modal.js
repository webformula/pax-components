import MDWUtils from '../../core/Utils.js';

export default class ModalHelper {
  constructor(componentElement) {
    this.componentElement = componentElement;
  }

  get initialPosition() {
    return this.minimizedPosition;
  }

  get minimizedPosition() {
    const contentHeight = this.componentElement.contentHeight;
    return Math.min(contentHeight, this.clientPosition);
  }

  get clientPosition() {
    return window.innerHeight / 2;
  }

  get isDraggable() {
    return this.componentElement.contentHeight > this.clientPosition;
  }

  registerHeader(element) {
    this.headerElement = element;
    this.headerElement.title = this.title;
  }

  setupHeader() {
    this.componentElement.insertAdjacentHTML('afterbegin', `<mdw-sheet-bottom-header mdw-title="${this.componentElement.title}"></mdw-sheet-bottom-header>`);
  }

  addBackdrop() {
    this.backdrop = MDWUtils.addBackdrop(this.componentElement, () => {
      this.componentElement.hide();
    });
  }

  removeBackdrop() {
    if (this.backdrop) this.backdrop.remove();
    this.backdrop = undefined;
  }

  handleOnMove({ position, isAtTop, isAboveTop, targetingTop, targetingInitial }) {
    if (targetingTop || isAtTop || isAboveTop) this.headerElement.show();
    else this.headerElement.hide();

    if (isAtTop || isAboveTop) this.headerElement.classList.add('mdw-fullscreen');
    else this.headerElement.classList.remove('mdw-fullscreen');

    if (isAboveTop) this.headerElement.classList.add('mdw-is-above-top');
    else this.headerElement.classList.remove('mdw-is-above-top');
  }
}
