import { Page, html } from '@webformula/pax-core';

export default class Autocomplete extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Autocomplete';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Autocomplete</h3>

        <div class="showcase">
          <mdw-textfield id="one">
            <input name="one">
            <label>Filled</label>
            <mdw-autocomplete for="one" filter>
              <option value="one">one</option>
              <option value="two">top</option>
            </mdw-autocomplete>
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
