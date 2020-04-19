import MDWUtils from '../../core/Utils.js';

const MDWScreen = new class {
  constructor() {
    this.currentSceen = null;
  }

  create({ animation, data, template }) {
    const id = MDWUtils.uid('screen');
    const screenTemplate = this.buildTemplate(data, template, id);
    document.body.insertAdjacentHTML('beforeend', screenTemplate);
    const screenComponent = document.querySelector(`#${id}`);
    this.currentSceen = screenComponent;
    screenComponent.animation = animation;
    return screenComponent;
  }

  buildTemplate(data, template, id) {
    return /* html */`
      <mdw-screen id="${id}">
        <mdw-panel>
          <mdw-screen-container>
            ${template(data)}
          </mdw-screen-container>
        </mdw-panel>
      </mdw-screen>
    `;
  }

  close() {
    if (!this.currentSceen) return;
    this.currentSceen.close();
  }

  // open() {
  //   return new Promise(resolve => {
  //     const id = this.uid();
  //     const template = this.template({ id, title, message, okLabel, cancelLabel, position });

  //     document.body.insertAdjacentHTML('beforeend', template);
  //     const el = document.querySelector(`#${id}`);
  //     const onclose = (e) => {
  //       resolve(e.detail.ok);
  //       el.removeEventListener('close', onclose);
  //       el.remove();
  //       this.currentDialog = null;
  //     };
  //     el.addEventListener('close', onclose);
  //     el.clickOutsideClose = clickOutsideClose;
  //     this.currentDialog = el;

  //     requestAnimationFrame(() => {
  //       el.open();
  //     });
  //   });
  // }

  removeCurrent() {
    this.currentDialog.close();
  }
}

window.MDWScreen = MDWScreen;

export default MDWScreen;
