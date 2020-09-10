import { Page } from '/web_modules/@webformula/pax-core/index.js';

export default class Surface extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Surfaces';
  }

  openPanel(target) {
    MDWSurface.open({
      component: 'panel',
      // animation: {
      //   type: 'height',
      //   origin: 'center',
      //   fullscreen: true
      // },
      anchorElement: target,
      template: 'surfaces/one.html'
    });
  }

  openSheetBottom() {
    MDWSurface.open({
      component: 'sheetBottom',
      template: 'surfaces/one.html'
    });
  }

  openSheetSide() {
    MDWSurface.open({
      component: 'sheetSide',
      template: 'surfaces/one.html'
    });
  }

  openUsingDefaults(target) {
    MDWSurface.open({
      anchorElement: target,
      template: 'surfaces/one.html'
    });
  }

  openUsingSheets(target) {
    MDWSurface.open({
      mobileComponent: 'sheetBottom',
      desktopComponent: 'sheetSide',
      anchorElement: target,
      template: 'surfaces/one.html'
    });
  }

  template() {
    return './page.html';
  }
}
