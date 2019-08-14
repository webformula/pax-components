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
          <mdw-select class="mdw-padding" mdw-enhanced style="width: 200px">
            <select>
              <option value="1" selected>item one</option>
              <option value="2">item two</option>
              <option value="3">item three</option>
              <option value="4">item four</option>
              <option value="5">item five</option>
            </select>
            <label>Floating label</label>
          </mdw-select>
        </div>

        <a href="https://material.io/design/components/text-fields.html">Material Design Guidlines: Text fields</a>
        <p>Select menus</p>

        <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#standard">Standard</anchor-link>
          <anchor-link selector="#enhanced">Enhanced</anchor-link>
          <anchor-link selector="#outlined">Outlined</anchor-link>
        </div>

        <section id="types">
          <h4>Types</h4>

          <!-- standard -->
          <mdw-card id="standard">
            <div class="mdw-card__content">
              <h6>Standard</h6>
              <div class="description">Uses standard browser select with a styled surface</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-select>
                  <select>
                    <option disabled selected></option>
                    <option value="a">aoptiomn</option>
                    <option value="b">b</option>
                  </select>
                  <label>Select</label>
                </mdw-select>
              </code-mirror>
            </div>

            <div class="mdw-card__content row">
              <mdw-select flex="1">
                <select>
                  <!-- empty select to start -->
                  <option disabled selected></option>
                  <option value="a">aoptiomn</option>
                  <option value="b">b</option>
                </select>
                <label>Select</label>
              </mdw-select>
              <span flex="1"></span>
            </div>
          </mdw-card>

          <!-- enhanced -->
          <mdw-card id="enhanced">
            <div class="mdw-card__content">
              <h6>Enhanced</h6>
              <div class="description">Enahnced material select menu</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-select class="mdw-padding" mdw-enhanced>
                  <select>
                    <option value="1" selected>item one</option>
                    <option value="2">item two</option>
                    <option value="3">item three</option>
                    <option value="4">item four</option>
                    <option value="5">item five</option>
                  </select>
                  <label>Floating label</label>
                </mdw-select>
              </code-mirror>
            </div>

            <div class="mdw-card__content row">
              <mdw-select class="mdw-padding" mdw-enhanced flex="1">
                <select>
                  <option value="1" selected>item one</option>
                  <option value="2">item two</option>
                  <option value="3">item three</option>
                  <option value="4">item four</option>
                  <option value="5">item five</option>
                </select>
                <label>Floating label</label>
              </mdw-select>
              <span flex="1"></span>
            </div>
          </mdw-card>


          <!-- outlined -->
          <mdw-card id="outlined">
            <div class="mdw-card__content">
              <h6>Outlined</h6>
              <div class="description">Use outlined style</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror mode="html">
                <mdw-select class="mdw-padding mdw-outlined" mdw-enhanced>
                  <select>
                    <option value="1">item one</option>
                    <option value="2">item two</option>
                    <option value="3">item three</option>
                    <option value="4">item four</option>
                    <option value="5">item five</option>
                  </select>
                  <label>Floating label</label>
                </mdw-select>
              </code-mirror>
            </div>

            <div class="mdw-card__content row">
              <mdw-select class="mdw-padding mdw-outlined" mdw-enhanced flex="1">
                <select>
                  <option value="1">item one</option>
                  <option value="2">item two</option>
                  <option value="3">item three</option>
                  <option value="4">item four</option>
                  <option value="5">item five</option>
                </select>
                <label>Floating label</label>
              </mdw-select>
              <span flex="1"></span>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
};
