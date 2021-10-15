import { Page } from '@webformula/pax-core';

export default class AutoComplete extends Page {
  constructor() {
    super();

    this.debounced_onInputShow = MDWUtils.debounce(this.onInputShow.bind(this), 300);
    this.debounced_onInputBasic = MDWUtils.debounce(this.onInputBasic.bind(this), 300);
    this.debounced_onInputTemplate = MDWUtils.debounce(this.onInputTemplate.bind(this), 300);

    this.values = [
      { text: 'one' },
      { text: 'two' },
      { text: 'three' },
      { text: 'four' },
      { text: 'five' }
    ];

    this.templateItems = [
      {
        text: 'one',
        secondary: 'other one text'
      },
      {
        text: 'two',
        secondary: 'other two text'
      },
      {
        text: 'three',
        secondary: 'other three text'
      },
      {
        text: 'four',
        secondary: 'other four text'
      },
      {
        text: 'five',
        secondary: 'other five text'
      }
    ];
  }

  get title() {
    return 'Auto complete';
  }

  template() {
    return 'pages/components/auto-complete/page.html';
  }

  connectedCallback() {
    document.querySelector('#show-textfield').addEventListener('input', this.debounced_onInputShow);
    document.querySelector('#basic-textfield').addEventListener('input', this.debounced_onInputBasic);
    document.querySelector('#template-textfield').addEventListener('input', this.debounced_onInputTemplate);

    document.querySelector('#template-autocomplete').rowTemplate = data => /*html*/`
      <mdw-list-item style="padding: 6px 12px;">
        <div class="mdw-list-item__text">
          <div class="mdw-list-item__primary-text">
            ${data.text}
          </div>
          <div class="mdw-list-item__secondary-text">
            ${data.secondary}
          </div>
        </div>
      </mdw-list-item>
    `;
  }

  async onInputShow(event) {
    document.querySelector('#show-auto').loading();
    await this.wait();
    document.querySelector('#show-auto').data = this.values.filter(v => v.text.includes(event.target.value));
  }

  async onInputBasic(event) {
    document.querySelector('#basic-auto').loading();
    await this.wait();
    document.querySelector('#basic-auto').data = this.values.filter(v => v.text.includes(event.target.value));
  }

  async onInputTemplate(event) {
    document.querySelector('#template-autocomplete').loading();
    await this.wait();
    document.querySelector('#template-autocomplete').data = this.templateItems.filter(v => v.text.includes(event.target.value));
  }

  onChange(event) {
    // document.querySelector('#one input').value = 'test';
  }

  wait(time = 1000) {
    return new Promise(resolve => {
      setTimeout(resolve, time);
    });
  }
}
