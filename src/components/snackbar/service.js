import Panel from '../../core/panel.js';
import util from '../../core/util.js';

const MDWSnackbar = new class MDWSnackbar {
  defaultMS = 3500;

  #currentSnackbar;
  #snackbarQueue = [];

  show(params = {
    message: '',
    action: false,
    actionLabel: 'Dismiss',
    ms: this.defaultMS
  }) {
    if (!params.message) throw Error('Message required');

    const panel = new Panel();
    panel.template = /*html*/`
      <mdw-snackbar>
        <div class="mdw-text">${params.message}</div>
        ${!params.action ? '' : `<mdw-button onclick="MDWSnackbar.dismiss()">${params.actionLabel || 'Dismiss'}</mdw-button>`}
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

  dismiss() {
    if (!this.#currentSnackbar) return;
    this.#currentSnackbar.panel.hide();
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
