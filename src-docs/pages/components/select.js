const { Page, html } = require('@webformula/pax-core');

module.exports = class Selects extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Selects';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Selects</h3>

        <div class="showcase">
          <mdw-select enhanced>
            <select>
              <option value="" disabled="" selected=""></option>
              <option value="a">aoptiomn</option>
              <option value="b">b</option>
            </select>
            <label>Select</label>
          </mdw-select>

          <mdw-select>
            <select>
              <option value="" disabled="" selected=""></option>
              <option value="a">aoptiomn</option>
              <option value="b">b</option>
            </select>
            <label>Select</label>
          </mdw-select>

          <mdw-select>
            <i class="mdw-select__icon"></i>
            <select>
              <option value="" disabled="" selected=""></option>
              <option value="a">aoptiomn</option>
              <option value="b">b</option>
            </select>
            <label>Select</label>
          </mdw-select>
        </div>

        <!-- <a href="https://material.io/design/components/buttons.html">Material Design Guidlines: Buttons</a>
        <p>Buttons allow users to take actions, and make choices, with a single tap</p>

        <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#Types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div> -->

        <section id="types">
          <h4>Types</h4>
        </section>

      </article>
    `;
  }
};
