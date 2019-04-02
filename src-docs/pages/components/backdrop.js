const { Page, html } = require('@webformula/pax-core');

module.exports = class Backdrop extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Backdrop';
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Backdrop</h3>

        <!-- <div class="showcase">
        </div> -->


        <section id="types">
          <h4>Types</h4>

          <div class="codecase">
            <div class="title">Basic</div>
            <code-mirror mode="html">
            </code-mirror>
            <div class="demo">
              <iframe style="margin: auto; width: 320px; height: 560px; border: 1px solid #ddd" src="basic-backdrop.html"></iframe>
            </div>
          </div>

        </section>

      </article>
    `;
  }
};
