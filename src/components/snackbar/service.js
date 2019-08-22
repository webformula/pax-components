const MDWSnackbar = new class {
  constructor() {
    this.queue = [];
  }

  add(el) {
    this.queue.push({el});
    this.handleQueue();
  }

  remove(el, ok) {
    if (this.current && this.current.el === el) el._close(ok);
    else this.queue = this.queue.filter(e => e.el !== el);
  }

  handleQueue() {
    if (this.queue.length === 0) return;

    if (!this.current) {
      this.current = this.queue.shift();
      this.current.el._open();
      this.current.el.addEventListener('close', () => {
        this.current = undefined;
        setTimeout(() => {
          this.handleQueue();
        }, 300);
      });
    }
  }

  show({ message, actionLabel, position }) {
    return new Promise(resolve => {
      const id = this.uid();
      const template = this.template({ id, message, actionLabel });

      this.topLevelElement.insertAdjacentHTML('beforeend', template);
      const el = document.querySelector(`#${id}`);
      const onclose = (e) => {
        resolve(e.detail.ok);
        el.removeEventListener('close', onclose);
        el.remove();
      };
      el.addEventListener('close', onclose);
      if (position) el.setPosition(position);
      el.show();
    });
  }

  get topLevelElement() {
    let el = document.body.querySelector('mdw-content');
    if (el) return el;

    el = document.bodyquerySelector('mdw-body');
    if (el) return el;

    return document.body;
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
              <mdw-button onclick="${id}.close(true)" class="mdw-close-button mdw-icon">
                <mdw-icon>close</mdw-icon>
              </mdw-button>
            </mdw-snackbar-actions>
          </mdw-snackbar-container>
        </mdw-panel>
      </mdw-snackbar>
    `;
  }
}

window.MDWSnackbar = MDWSnackbar;

export default MDWSnackbar;
