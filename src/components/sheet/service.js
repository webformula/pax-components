import MDWUtils from '../../core/Utils.js';
import MDWTemplate from '../templates/service.js';

let _currentSheet;

const MDWSheet = new class {
  /* template:
   * this can be a template id, template url or template string
   */
  async show({ template, templateData }) {
    // make sure we do not stack
    if (window._currentSheet) this.hide();

    const id = MDWUtils.uid('screen');
    const templateString = MDWTemplate.isString(template) ? template : await MDWTemplate.get(template, templateData);

    let sheetTemplate;
    if (MDWUtils.isMobile) sheetTemplate = this._buildSheetBottomTemplate(templateString, id);
    else sheetTemplate = this._buildSheetSideTemplate(templateString, id);

    const sheetComponent = document.querySelector(`#${id}`);
    window._currentSheet = sheetComponent;
    sheetComponent.show();
    return sheetComponent;
  }

  hide() {
    if (!window._currentSheet) return;
    window._currentSheet.hide();
  }

  exitFullscreen() {
    if (!window._currentSheet) return;
    window._currentSheet.exitFullscreen();
  }


  _buildSheetBottomTemplate(templateString, id) {
    const html = /* html */`
      <mdw-sheet-bottom id="${id}">
        ${templateString}
      </mdw-sheet-bottom>
    `;
    const page = document.querySelector('mdw-page');
    if (page) page.insertAdjacentHTML('afterEnd', html);
    else document.body.insertAdjacentHTML('beforeend', html);
  }


  _buildSheetSideTemplate(templateString, id) {
    const html = /* html */`
      <mdw-sheet-side id="${id}" class="mdw-hide" mdw-modal mdw-no-backdrop>
        ${templateString}
      </mdw-sheet-side>
    `;
    const page = document.querySelector('mdw-page');
    if (page) page.insertAdjacentHTML('afterEnd', html);
    else document.body.insertAdjacentHTML('beforeend', html);
  }
};

window.MDWSheet = MDWSheet;

export default MDWSheet;
