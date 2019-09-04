import { Page, html } from '@webformula/pax-core';

export default class Radio extends Page {
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
          <mdw-radio-group name="test">
            <label>On</label>
            <mdw-radio value="on"></mdw-radio>

            <span class="mdw-spacer"></span>

            <label>off</label>
            <mdw-radio value="off"></mdw-radio>
          </mdw-radio-group>
        </div>

      </article>
    `;
  }
}
