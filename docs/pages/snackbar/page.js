import { Page } from '@webformula/pax-core';
import { MDWSnackbar } from '@webformula/pax-components';
import html from './page.html';

export default new class extends Page {
  templateString = html;

  constructor() {
    super();
  }

  basic() {
    MDWSnackbar.show({
      message: 'Message goes here'
    });
  }

  async action() {
    await MDWSnackbar.show({
      message: 'Message goes here',
      action: true,
      actionLabel: 'Done'
    });
    console.log('Snackbar dismissed');
  }

  async noClose() {
    await MDWSnackbar.show({
      message: 'Message goes here',
      closeButton: false,
      ms: 6000
    });
  }
}
