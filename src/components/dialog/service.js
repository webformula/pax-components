import Panel from '../../core/panel.js'
import closeIconSVGRaw from '../../svg-icons/close_FILL1_wght400_GRAD0_opsz24.svg';

const MDWDialog = new class MDWDialog {
  #currentDialog;
  #currentDialogPromiseResolve;


  simple(params = {
    headline: '',
    message: '',
    actionPositive: true,
    actionPositiveLabel: 'OK',
    actionNegative: false,
    actionNegativeLabel: 'Cancel'
  }) {
    const panel = new Panel();

    const actionPositive = params.actionPositive || true;
    const actionPositiveLabel = params.actionPositiveLabel || 'OK';
    const actionNegative = params.actionNegative || false;
    const actionNegativeLabel = params.actionNegativeLabel || 'Cancel';

    panel.template = `
      <mdw-dialog>
        ${!params.headline ? '' : `<div class="mdw-header">${params.headline}</div>`}
        <div class="mdw-content">${params.message || ''}</div>
        ${actionNegative !== true && actionPositive !== true ? '' : `<div class="mdw-actions">
          ${actionPositive !== true ? '' : `<mdw-button onclick="MDWDialog.close('positive')">${actionPositiveLabel || 'OK'}</mdw-button>`}
          ${actionNegative !== true ? '' : `<mdw-button onclick="MDWDialog.close('negative')">${actionNegativeLabel || 'Cancel'}</mdw-button>`}
        </div>`}
      </mdw-dialog>
    `;

    panel.show();

    this.#currentDialog = panel;
    return new Promise(resolve => {
      this.#currentDialogPromiseResolve = resolve;
    });
  }

  template(params = {
    template: ''
  }) {
    const panel = new Panel();
    panel.template = params.template;
    panel.show();

    this.#currentDialog = panel;
    return new Promise(resolve => {
      this.#currentDialogPromiseResolve = resolve;
    });
  }
  
  fullscreen(params = {
    template: ''
  }) {
    const panel = new Panel();
    panel.template = params.template;
//     panel.template = `
//       <mdw-dialog>
//         <div class="mdw-header">
//           <div class="mdw-icon-svg" onclick="MDWDialog.close()">${closeIconSVGRaw}</div>
//           <div class="mdw-headline">Headline</div>
//           <mdw-button>Save</mdw-button>
//         </div>
//         <div class="mdw-content">
//           <mdw-text-field style="width: 100%">
//             <input>
//             <label>First name</label>
//           </mdw-text-field>
//           <mdw-text-field style="width: 100%">
//             <input>
//             <label>Last name</label>
//           </mdw-text-field>

//           <div class="mdw-supporting-text">
//           Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

// The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
//           </div>
//         </div>
//       </mdw-dialog>
//     `;
    panel.fullScreen = true;
    panel.show();
    
    this.#currentDialog = panel;
    return new Promise(resolve => {
      this.#currentDialogPromiseResolve = resolve;
    });
  }



  close(message) {
    if (!this.#currentDialog) throw Error('No dialog to close');
    if (this.#currentDialogPromiseResolve) this.#currentDialogPromiseResolve(message);
    this.#currentDialog.hide();

    this.#currentDialog = undefined;
    this.#currentDialogPromiseResolve = undefined;
  }
}

window.MDWDialog = MDWDialog;
export default MDWDialog;
