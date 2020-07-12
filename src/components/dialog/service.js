import MDWUtils from '../../core/Utils.js';
import MDWTemplate from '../templates/service.js';

const MDWDialog = new class {
  constructor() {
    this.currentDialog = null;
  }

  async open({ title, message, okLabel, cancelLabel, template, position = 'center center', clickOutsideClose = false }) {
    return new Promise(async resolve => {
      const id = MDWUtils.uid('dialog');
      
      let templateString;
      if (template) {
        if (title !== undefined || message !== undefined || okLabel !== undefined || cancelLabel !== undefined) {
          console.warn('Cannot use "title", "message", "okLabel", or cancelLabel when using "template');
        }
        templateString = this.templateWrapper({ id, position, template: MDWTemplate.isString(template) ? template : await MDWTemplate.get(template) });
      } else {
        templateString = this.template({ id, title, message, okLabel, cancelLabel, position });
      }
      
      document.body.insertAdjacentHTML('beforeend', templateString);
      const el = document.querySelector(`#${id}`);
      const onclose = (e) => {
        resolve(e.detail.ok);
        el.removeEventListener('close', onclose);
        el.remove();
        this.currentDialog = null;
      };
      el.addEventListener('close', onclose);
      el.clickOutsideClose = clickOutsideClose;
      this.currentDialog = el;

      requestAnimationFrame(() => {
        el.open();
      });
    });
  }

  close() {
    this.currentDialog.close();
  }

  template({ id, title, message, okLabel, cancelLabel, position }) {
    return `
      <mdw-dialog id="${id}">
        <mdw-panel mdw-position="${position}">
          <mdw-header>
            ${!!title ? `<div class="mdw-title">${title}</div>` : ''}
          </mdw-header>

          <mdw-content>
            ${message}
          </mdw-content>

          <mdw-footer>
            ${!!cancelLabel ? `<mdw-button onclick="${id}.close(false)">${cancelLabel}</mdw-button>` : ''}
            ${!!okLabel ? `<mdw-button onclick="${id}.close(true)">${okLabel}</mdw-button>` : ''}
          </mdw-footer>
        </mdw-panel>
      </mdw-dialog>
    `;
  }

  templateWrapper({ id, template, position }) {
    return `
      <mdw-dialog id="${id}">
        <mdw-panel mdw-position="${position}">
          ${template}
        </mdw-panel>
      </mdw-dialog>
    `;
  }
}

window.MDWDialog = MDWDialog;

export default MDWDialog;
