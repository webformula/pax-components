import { Page } from '@webformula/pax-core';
import html from './page.html';

export default new class extends Page {
  templateString = html;

  constructor() {
    super();
  }

  connectedCallback() {
    document.querySelector('#post-icon-actions-list').addEventListener('change', (event) => {
      if (event.detail?.action === 'delete') {
        console.log('delete action on list-item', event.detail)
      }

      if (event.detail?.action === 'edit') {
        console.log('delete action on list-item', event.detail)
      }
    });

    document.querySelector('#swipe-actions-list').addEventListener('change', (event) => {
      if (event.detail?.action === 'delete') {
        console.log('delete action on list-item', event.detail)
      }

      if (event.detail?.action === 'edit') {
        console.log('delete action on list-item', event.detail)
      }
    });
  }

  selectChange(value) {
    console.log('select value', value);
  }

  selectMultipleChange(value) {
    console.log('select value', value);
  }
}
