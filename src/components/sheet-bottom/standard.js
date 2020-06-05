export default class SheetBottomStandard {
  constructor(componentElement) {
    this.componentElement = componentElement;
  }

  get initialPosition() {
    return this.headerElement.offsetHeight;
  }

  get topPosition() {

  }

  get clientPosition() {
    return window.innerHeight / 4;
  }

  get isDraggable() {
    return this.componentElement.contentHeight > this.clientPosition;
  }

  registerHeader(element) {
    this.headerElement = element;
    this.headerElement.title = this.title;
  }

  setupHeader() {
    const header = this.componentElement.querySelector('mdw-header');
    this.componentElement.insertAdjacentHTML('afterbegin', `<mdw-sheet-bottom-header mdw-title="${this.componentElement.title}" class="${header.classList.toString()}">${header && header.innerHTML}</mdw-sheet-bottom-header>`);
    if (header) header.remove();
  }

  addBackdrop() {

  }

  removeBackdrop() {
    
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
 