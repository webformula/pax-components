new class MDWSnackbar {
  show({ message, actionLabel }) {
    return new Promise(resolve => {
      const id = this.uid();
      const template = this.template({ id, message, actionLabel });

      document.body.insertAdjacentHTML('beforeend', template);
      const el = document.querySelector(`#${id}`);
      const onclose = (e) => {
        resolve(e.detail.ok);
        el.removeEventListener('close', onclose);
        el.remove();
      };
      el.addEventListener('close', onclose);
      el.show();
    });
  }

  uid() {
    return `snackbar_${parseInt(Math.random() * 99999)}`;
  }

  template({ id, message, actionLabel }) {
    return html`
      <mdw-snackbar id="${id}">
        <mdw-panel>
          <mdw-snackbar-container>
            <mdw-snackbar-content>${message}</mdw-snackbar-content>
            <mdw-snackbar-actions>
              ${!!actionLabel ? `<mdw-button class="mdw-action-button">${actionLabel}</mdw-button>` : ''}
              <mdw-button onclick="${id}.close(true)" class="mdw-close-button">
                <mdw-icon>close</mdw-icon>
              </mdw-button>
            </mdw-snackbar-actions>
          </mdw-snackbar-container>
        </mdw-panel>
      </mdw-snackbar>
    `;
  }
}
