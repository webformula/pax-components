const { Page, html, cssStr } = require('@webformula/pax-core');

module.exports = class List extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'List';
  }

  get listData() {
    return [
      'one',
      'two',
      'three'
    ];
  }

  get listHugeData() {
    return [...Array(400)].map((_, pos) => ({
      id: pos,
      label: `Item ${pos}`,
      secondary: 'secondary title'
    }));
  }

  template() {
    return html`
      <article class="page-article">
        <h3>List</h3>

        <div class="showcase">
          <mdw-list style="background-color: white">
            ${this.listData.map(t => `
              <mdw-list-item>
                <span class="mdw-list-item__graphic material-icons">inbox</span>
                ${t}
              </mdw-list-item>
            `).join('\n')}
          </mdw-list>
        </div>

        <section id="types">
          <h4>Examples</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Huge ass list</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <mdw-list-item active>
                  <span class="mdw-list-item__graphic material-icons">inbox</span>
                  <div class="mdw-list-item__text">
                    <div class="mdw-list-item__primary-text">
                      Two
                    </div>
                    <div class="mdw-list-item__secondary-text">
                      Secondary
                    </div>
                  </div>
                  <span class="mdw-list-item__meta material-icons">info</span>
                  <div class="ripple list-item-ripple"></div>
                </mdw-list-item>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-list two-line style="background-color: white">
                ${this.listHugeData.map(t => `
                  <mdw-list-item ${t.id === 1 ? 'active' : ''}>
                    <span class="mdw-list-item__graphic material-icons">inbox</span>
                    <div class="mdw-list-item__text">
                      <div class="mdw-list-item__primary-text">
                        ${t.label}
                      </div>
                      <div class="mdw-list-item__secondary-text">
                        ${t.secondary}
                      </div>
                    </div>
                    <span class="mdw-list-item__meta material-icons">info</span>
                    <div class="ripple list-item-ripple"></div>
                  </mdw-list-item>
                `).join('\n')}
              </mdw-list>
            </div>
          </mdw-card>

        </section>

      </article>
    `;
  }
};
