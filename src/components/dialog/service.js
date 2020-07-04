import MDWUtils from '../../core/Utils.js';

const MDWDialog = new class {
  constructor() {
    this.currentDialog = null;
  }

  open({ title, message, okLabel, cancelLabel, position = 'center center', clickOutsideClose = false }) {
    return new Promise(resolve => {
      const id = MDWUtils.uid('dialog');
      const template = this.template({ id, title, message, okLabel, cancelLabel, position });

      document.body.insertAdjacentHTML('beforeend', template);
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

  removeCurrent() {
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
            ${!!cancelLabel ? `<mdw-button class="mdw-error" onclick="${id}.close(false)">${cancelLabel}</mdw-button>` : ''}
            ${!!okLabel ? `<mdw-button onclick="${id}.close(true)">${okLabel}</mdw-button>` : ''}
          </mdw-footer>
        </mdw-panel>
      </mdw-dialog>
    `;
  }
}

window.MDWDialog = MDWDialog;

export default MDWDialog;
