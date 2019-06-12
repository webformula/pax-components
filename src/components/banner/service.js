new class MDWBanner {
  constructor() {
    this.queue = [];
  }

  add(el) {
    this.queue.push({el});
    this.handleQueue();
  }

  remove(el) {
    if (this.current && this.current.el === el) el._dissmiss();
    else this.queue = this.queue.filter(e => e.el !== el);
  }

  handleQueue() {
    if (this.queue.length === 0) return;

    if (!this.current) {
      this.current = this.queue.shift();
      this.current.el._show();
      this.current.el.addEventListener('close', () => {
        this.current = undefined;
        setTimeout(() => {
          this.handleQueue();
        }, 300);
      });
    }
  }

  create({ message, dismissLabel = "dismiss", acceptLabel = null, template, parent }) {
    if (!message && !template) throw Error('Either `message` or `template` is required');
    if (!template && !dismissLabel && !acceptLabel) throw Error('When not using a `template` you are required to provide either a `dismissLabel` or an `acceptLabel`');

    const uid = MDWUtils.uid();
    if (!template) template = this.template(message, dismissLabel, acceptLabel, uid);

    // try to find the correct parent if not passed in
    let parentElement = parent || document.querySelector('mdw-page > mdw-top-app-bar');
    if (!parentElement) parentElement = document.querySelector('mdw-page');
    if (!parentElement) parentElement = document.querySelector('body');

    let bannerElement = undefined;
    if (parentElement.nodeName === 'MDW-TOP-APP-BAR') {
      parentElement.insertAdjacentHTML('afterend', template);
      bannerElement = document.querySelector(`mdw-banner#${uid}`);
    } else {
      parentElement.insertAdjacentHTML('afterbegin', template);
      bannerElement = document.querySelector(`mdw-banner#${uid}`);
    }

    // NOTE may need timeout
    this.add(bannerElement);
  }

  template(message, dismissLabel, acceptLabel, uid) {
    return html`
      <mdw-banner id="${uid}">
        <div>${message}</div>
        <div>
          ${dismissLabel ? `<mdw-button onclick="${uid}.dismiss()">${dismissLabel}</mdw-button>` : ''}
          ${acceptLabel ? `<mdw-button onclick="${uid}.accept()">${acceptLabel}</mdw-button>` : ''}
        </div>
      </mdw-banner>
    `;
  }
}
