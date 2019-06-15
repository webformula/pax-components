const { Page, html } = require('@webformula/pax-core');

module.exports = class Autocomplete extends Page {
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
            <mdw-autocomplete for="one">
              <div class="options-list">
                <option>hello</option>
                <option>hello</option>
              </div>
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
};
