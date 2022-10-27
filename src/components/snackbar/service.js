import Panel from '../../core/panel.js';
import util from '../../core/util.js';

const MDWSnackbar = new class MDWSnackbar {
  defaultMS = 4000;

  #currentSnackbar;
  #snackbarQueue = [];

  show(params = {
    message: '',
    actionLabel: '',
    closeButton: true,
    ms: this.defaultMS
  }) {
    if (!params.message) throw Error('Message required');
    if (params.closeButton === undefined) params.closeButton = true;
    const panel = new Panel();
    panel.template = /*html*/`
      <mdw-snackbar ${!params.lineTwo ? '' : 'class="mdw-line-two"'}>
        <div class="mdw-text">${params.message}</div>
        ${!params.actionLabel ? '' : `<mdw-button onclick="MDWSnackbar.dismiss('action')">${params.actionLabel || 'Dismiss'}</mdw-button>`}
        ${params.actionLabel || !params.closeButton ? '' : `<mdw-icon onclick="MDWSnackbar.dismiss('close')">close</mdw-icon>`}
      </mdw-snackbar>
    `;
    panel.position = 'bottom left';
    panel.clickOutsideToClose = false;
    panel.animation = 'scale';
    panel.adjustForBarsAndNavigation = true;
    panel.backdrop = false;
    panel.offsetX = 8;
    panel.offsetY = 8;

    return new Promise(resolve => {
      this.#snackbarQueue.push({
        panel,
        resolve,
        ms: params.ms || this.defaultMS
      });
      this.#handleQueue();
    });
  }

  dismiss(source) {
    if (!this.#currentSnackbar) return;
    this.#currentSnackbar.panel.hide(source);
  }

  #handleQueue() {
    if (this.#currentSnackbar) return;
    this.#currentSnackbar = this.#snackbarQueue.shift();
    if (!this.#currentSnackbar) return;

    const currentTimer = setTimeout(() => {
      this.#currentSnackbar.panel.hide();
    }, this.#currentSnackbar.ms);
    this.#currentSnackbar.panel.show();
    this.#currentSnackbar.panel.onHide = async () => {
      clearTimeout(currentTimer)
      this.#currentSnackbar.resolve();
      this.#currentSnackbar = undefined;
      await util.wait(500);
      this.#handleQueue();
    };
  }
}

window.MDWSnackbar = MDWSnackbar;
export default MDWSnackbar;
