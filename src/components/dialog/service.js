const MDWDialog = new class {
  constructor() {
    this.currentDialog = null;
  }

  show({ title, message, okLabel, cancelLabel, position = 'center center' }) {
    return new Promise(resolve => {
      const id = this.uid();
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
      el.show();
      this.currentDialog = el;
    });
  }

  removeCurrent() {
    this.currentDialog.close();
  }

  uid() {
    return `dialog_${parseInt(Math.random() * 99999)}`;
  }

  template({ id, title, message, okLabel, cancelLabel, position }) {
    return html`
      <mdw-dialog id="${id}">
        <mdw-panel mdw-position="${position}">
          <mdw-dialog-container>
            ${!!title ? `<mdw-dialog-title>${title}</mdw-dialog-title>` : ''}
            <mdw-dialog-content>${message}</mdw-dialog-content>
            <mdw-dialog-actions>
              ${!!cancelLabel ? `<mdw-button class="mdw-error" onclick="${id}.close(false)">${cancelLabel}</mdw-button>` : ''}
              ${!!okLabel ? `<mdw-button onclick="${id}.close(true)">${okLabel}</mdw-button>` : ''}
            </mdw-dialog-actions>
          </mdw-dialog-container>
        </mdw-panel>
      </mdw-dialog>
    `;
  }
}

window.MDWDialog = MDWDialog;

export default MDWDialog;
