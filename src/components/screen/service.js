import MDWUtils from '../../core/Utils.js';
import MDWTemplate from '../templates/service.js';

const MDWScreen = new class {
  constructor() {
    this._currentScreen = null;
  }

  async show({ animation, templateData, templateId, desktopComponent = 'mdw-sheet-side', mobileComponent= 'mdw-panel' }) {
    const id = MDWUtils.uid('screen');
    const template = await MDWTemplate.get(templateId, templateData);

    let screenTemplate;
    if (MDWUtils.isMobile) screenTemplate = mobileComponent === 'mdw-sheet-side' ? this._buildSheetSideTemplate(template, id) : this._buildPanelTemplate(template, id);
    else screenTemplate = desktopComponent === 'mdw-panel' ? this._buildPanelTemplate(template, id) : this._buildSheetSideTemplate(template, id);
    const screenComponent = document.querySelector(`#${id}`);
    this._currentScreen = screenComponent;
    screenComponent.animation = animation;
    screenComponent.desktopComponent = desktopComponent;
    screenComponent.mobileComponent = mobileComponent;
    screenComponent.open();
    return screenComponent;
  }

  _buildPanelTemplate(templateString, id) {
    document.body.insertAdjacentHTML('beforeend', /* html */`
      <mdw-screen id="${id}">
        <mdw-panel>
          ${templateString}
        </mdw-panel>
      </mdw-screen>
    `);
  }

  _buildSheetSideTemplate(templateString, id) {
    const page = document.querySelector('mdw-page');
    if (page) page.insertAdjacentHTML('afterEnd', /* html */`
      <mdw-screen id="${id}">
        <mdw-sheet-side class="mdw-hide">
          ${templateString}
        </mdw-sheet-side>
      </mdw-screen>
    `);
    else document.body.insertAdjacentHTML('beforeend', /* html */`
      <mdw-screen id="${id}">
        <mdw-sheet-side class="mdw-hide">
          ${templateString}
        </mdw-sheet-side>
      </mdw-screen>
    `);
  }

  close() {
    if (!this._currentScreen) return;
    this._currentScreen.close();
  }
}

window.MDWScreen = MDWScreen;

export default MDWScreen;
