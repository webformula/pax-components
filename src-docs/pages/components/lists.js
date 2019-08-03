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

  get selectListData() {
    return [
      {
        id: 1,
        label: 'Item 1',
        secondary: 'secondary title' },
      {
        id: 2,
        label: 'Item 2',
        secondary: 'secondary title' },
      {
        id: 3,
        label: 'Item 3',
        secondary: 'secondary title' } ];
  }

  toggleListSelect(value) {
    document.querySelector('#select-list').deselectAll();
    if (!value) {
      document.querySelector('#select-list').setAttribute('mdw-select', 'single');
    } else {
      document.querySelector('#select-list').setAttribute('mdw-select', 'multiple');
    }
  }

  toggleListOnclickSelect(value) {
    if (value) {
      document.querySelector('#select-list').setAttribute('mdw-select-onclick', '');
    } else {
      document.querySelector('#select-list').removeAttribute('mdw-select-onclick');
    }
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
              <h6>Selectable list</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <code-mirror type="html">
                <!-- mdw-select-onclick will make the entire list-item select on click. Otherwise it will be just the checkbox -->
                <mdw-list mdw-select="single or multiple" mdw-select-onclick class="mdw-two-line">
                  <mdw-list-item>
                    <span class="mdw-list-item__graphic material-icons">inbox</span>
                    <div class="mdw-list-item__text">
                      <div class="mdw-list-item__primary-text">
                        Two
                      </div>
                      <div class="mdw-list-item__secondary-text">
                        Secondary
                      </div>
                    </div>
                    <mdw-checkbox class="mdw-list-item__meta"></mdw-checkbox>
                    <div class="mdw-ripple mdw-list-item-ripple"></div>
                  </mdw-list-item>
                </mdw-list>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <div class="row" style="align-items: center;">
                <div>
                  <label>Toggle Select single/multiple</label>
                  <mdw-switch onchange="$List.toggleListSelect(this.checked)"></mdw-switch>
                </div>

                <div>
                  <label>Toggle mdw-select-onclick</label>
                  <mdw-switch onchange="$List.toggleListOnclickSelect(this.checked)" checked></mdw-switch>
                </div>

                <mdw-button class="mdw-error" onclick="document.querySelector('#select-list').deselectAll()">deselect</mdw-button>
                <span id="show-selected" class="flex-1" style="padding-left: 24px; font-weight: 500"></span>
              </div>
              <mdw-list id="select-list" mdw-select="single" mdw-select-onclick onchange="document.querySelector('#show-selected').innerText = this.selected.join(', ')" class="mdw-two-line" style="background-color: white">
                ${this.selectListData.map(t => `
                  <mdw-list-item>
                    <span class="mdw-list-item__graphic material-icons">inbox</span>
                    <div class="mdw-list-item__text">
                      <div class="mdw-list-item__primary-text">
                        ${t.label}
                      </div>
                      <div class="mdw-list-item__secondary-text">
                        ${t.secondary}
                      </div>
                    </div>
                    <mdw-checkbox class="mdw-list-item__meta"></mdw-checkbox>
                    <div class="mdw-ripple mdw-list-item-ripple"></div>
                  </mdw-list-item>
                `).join('\n')}
              </mdw-list>
            </div>
          </mdw-card>

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
                      Main
                    </div>
                    <div class="mdw-list-item__secondary-text">
                      Secondary
                    </div>
                  </div>
                  <span class="mdw-list-item__meta material-icons">info</span>
                  <div class="mdw-ripple mdw-list-item-ripple"></div>
                </mdw-list-item>
              </code-mirror>
            </div>

            <div class="mdw-card__content">
              <mdw-list class="mdw-two-line" style="background-color: white">
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
                    <div class="mdw-ripple mdw-list-item-ripple"></div>
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
