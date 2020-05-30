import MDWUtils from '../../core/Utils.js';
import MDWTemplate from '../templates/service.js';

const MDWScreen = new class {
  constructor() {
    this._currentSceen = null;
  }

  async show({ animation, templateData, templateId }) {
    const id = MDWUtils.uid('screen');
    const template = await MDWTemplate.get(templateId, templateData);
    const screenTemplate = this._buildTemplate(template, id);
    document.body.insertAdjacentHTML('beforeend', screenTemplate);
    const screenComponent = document.querySelector(`#${id}`);
    this._currentSceen = screenComponent;
    screenComponent.animation = animation;
    screenComponent.open();
    return screenComponent;
  }

  _buildTemplate(templateString, id) {
    return /* html */`
      <mdw-screen id="${id}">
        <mdw-panel>
          <mdw-screen-container>
            ${templateString}
          </mdw-screen-container>
        </mdw-panel>
      </mdw-screen>
    `;
  }

  close() {
    if (!this._currentSceen) return;
    this._currentSceen.close();
  }
}

window.MDWScreen = MDWScreen;

export default MDWScreen;
