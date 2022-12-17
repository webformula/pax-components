import { Page } from '@webformula/pax-core';
import html from './page.html';

export default new class extends Page {
  pageTitle = 'Cards';
  
  constructor() {
    super();

    this.cardArray = [...new Array(6).keys()].map((_, i) => ({ height: i % 4 === 0 ? '488px' : '244px'}));
  }

  template() {
    return this.renderTemplateString(html);
  }

  onSwipeAction(element) {
    console.log('checked', element.hasAttribute('checked'));
  }
}
