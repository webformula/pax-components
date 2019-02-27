new class MDWBanner {
  constructor() {}

  create({ message, dismissLabel = "dismiss", acceptLabel = null, template, parent }) {
    if (!message && !template) throw Error('Either `message` or `template` is required');
    if (!template && !dismissLabel && !acceptLabel) throw Error('When not using a `template` you are required to provide either a `dismissLabel` or an `acceptLabel`');

    if (!template) template = this.template(message, dismissLabel, acceptLabel);

    // try to find the correct parent if not passed in
    let parentElement = parent || document.querySelector('mdw-page > mdw-top-app-bar');
    if (!parentElement) parentElement = document.querySelector('mdw-page');
    if (!parentElement) parentElement = document.querySelector('body');

    let bannerElement = undefined;
    if (parentElement.nodeName === 'MDW-TOP-APP-BAR') {
      parentElement.insertAdjacentHTML('afterend', template);
      bannerElement = parentElement.nextSibling;
      if (!bannerElement.nodeName !== 'MDW-BANNER') bannerElement = bannerElement.nextSibling;
    } else {
      parentElement.insertAdjacentHTML('afterbegin', template);
      bannerElement = parentElement.firstChild;
    }

    setTimeout(() => {
      bannerElement.show();
    }, 0);
  }

  template(message, dismissLabel, acceptLabel) {
    const uid = MDWUtils.uid();
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
