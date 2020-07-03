import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class Layout extends Page {
  constructor() {
    super();

    this.direction_ = 'mdw-row';
  }

  get title() {
    return 'Content Layout';
  }

  setDirection(value) {
    if (value === this.direction_) return;
    this.direction_ = value;
    this.render();
  }

  setWrap(value) {
    if (value === this.wrap_) return;
    this.wrap_ = value;
    this.render();
  }

  setPosY(value) {
    if (value === this.posY_) return;
    this.posY_ = value;
    this.render();
  }

  setPosX(value) {
    if (value === this.posX_) return;
    this.posX_ = value;
    this.render();
  }

  setFlexA(value) {
    if (value === this.flexA_) return;
    this.flexA_ = value;
    this.render();
  }

  setFlexB(value) {
    if (value === this.flexB_) return;
    this.flexB_ = value;
    this.render();
  }

  toggleWrap() {
    this.baseWrapped_ = !this.baseWrapped_;
    document.querySelector('.base-layout-container').classList.toggle('add-wrap', this.baseWrapped_);
  }

  template() {
    return './page.html';
  }
}
