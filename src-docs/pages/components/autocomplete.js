import { Page } from '@webformula/pax-core';

export default class Autocomplete extends Page {
  constructor() {
    super();

    this.debounced_onInput = MDWUtils.debounce(this.onInput.bind(this), 300);

    this.values = [
      {
        value: '1',
        text: 'one'
      },
      {
        value: '2',
        text: 'two'
      },
      {
        value: '3',
        text: 'three'
      },
      {
        value: '4',
        text: 'four'
      },
      {
        value: '5',
        text: 'five'
      }
    ];
  }

  get title() {
    return 'Autocomplete';
  }

  connectedCallback() {
    document.querySelector('#one').addEventListener('input', this.debounced_onInput);

    document.querySelector('#auto').templateCallback = data => {
      return /*html*/`
        <mdw-list-item>
          <div class="mdw-list-item__text">
            <div class="mdw-list-item__primary-text">
              ${data.text}
            </div>
            <div class="mdw-list-item__secondary-text">
              This is a template
            </div>
          </div>
        </mdw-list-item>
      `;
    }
  }

  onInput(event) {
    document.querySelector('#auto').data = this.values.filter(v => v.text.includes(event.target.value));
  }

  onChange(event) {
    // document.querySelector('#one input').value = 'test';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Autocomplete</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-textfield id="one">
            <input />
            <label>Filled</label>
            <mdw-autocomplete id="auto" onchange="activePage.onChange(event)"></mdw-autocomplete>
          </mdw-textfield>
        </div>

        <a href="https://material.io/design/components/text-fields.html">Material Design Guidlines: Text fields</a>
        <p>Text fields let users enter and edit text</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#outlined" offset="64">Outlined</anchor-link>
        </div>

      </article>
    `;
  }
}
