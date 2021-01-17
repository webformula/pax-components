// TODO fix toggle mdw-select-onclick AND Toggle Select single/multiple
import { Page} from '@webformula/pax-core';

export default class List extends Page {
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
    return [...Array(200)].map((_, pos) => ({
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
    return /* html */`
      <article class="page-article">
        <h3>List</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-list>
            ${this.listData.map(t => `
              <mdw-list-item>
                <mdw-icon>inbox</mdw-icon>
                ${t}
              </mdw-list-item>
            `).join('\n')}
          </mdw-list>
        </div>

        <a href="https://material.io/components/lists/" target="_new">Material Design Guidelines: Lists</a>
        <p>Lists are continuous, vertical indexes of text or images</p>

        <section id="types">
          <h4>Examples</h4>


          <mdw-card>
            <div class="mdw-card__content">
              <h6>Selectable list</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <!-- mdw-select-onclick will make the entire list-item select on click. Otherwise it will be just the checkbox -->
                <mdw-list mdw-select="single or multiple" mdw-select-onclick class="mdw-two-line">
                  <mdw-list-item>
                    <mdw-icon>inbox</mdw-icon>
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
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <div class="row" style="align-items: center;">
                <div style="margin-right: 24px">
                  <label>Toggle Select single/multiple</label>
                  <mdw-switch onchange="activePage.toggleListSelect(this.checked)"></mdw-switch>
                </div>

                <div style="margin-right: 24px">
                  <label>Toggle mdw-select-onclick</label>
                  <mdw-switch onchange="activePage.toggleListOnclickSelect(this.checked)" checked></mdw-switch>
                </div>

                <mdw-button class="mdw-error" onclick="document.querySelector('#select-list').deselectAll()">deselect</mdw-button>
                <span id="show-selected" class="flex-1" style="padding-left: 24px; font-weight: 500"></span>
              </div>
              <mdw-list id="select-list" mdw-select="single" mdw-select-onclick onchange="document.querySelector('#show-selected').innerText = this.selected.join(', ')" class="mdw-two-line">
                ${this.selectListData.map((t, i) => `
                  <mdw-list-item onclick="console.log('test')" mdw-key="key">
                    <mdw-icon>inbox</mdw-icon>
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
              <h6>Subheaders</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-list>
                  <div class="mdw-subheader">Header 1</div>

                  <mdw-list-item>
                    <mdw-icon>inbox</mdw-icon>
                    <div class="mdw-list-item__text">
                      <div class="mdw-list-item__primary-text">One</div>
                    </div>
                  </mdw-list-item>

                  <div class="mdw-subheader">Header 2</div>

                  <mdw-list-item>
                    <mdw-icon>inbox</mdw-icon>
                    <div class="mdw-list-item__text">
                      <div class="mdw-list-item__primary-text">One</div>
                    </div>
                  </mdw-list-item>
                </mdw-list>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-list>
                <div class="mdw-subheader">Header 1</div>

                <mdw-list-item>
                  <mdw-icon>inbox</mdw-icon>
                  <div class="mdw-list-item__text">
                    <div class="mdw-list-item__primary-text">One</div>
                  </div>
                </mdw-list-item>

                <mdw-list-item>
                  <mdw-icon>inbox</mdw-icon>
                  <div class="mdw-list-item__text">
                    <div class="mdw-list-item__primary-text">Two</div>
                  </div>
                </mdw-list-item>

                <div class="mdw-subheader">Header 2</div>

                <mdw-list-item>
                  <mdw-icon>inbox</mdw-icon>
                  <div class="mdw-list-item__text">
                    <div class="mdw-list-item__primary-text">Three</div>
                  </div>
                </mdw-list-item>

                <mdw-list-item>
                  <mdw-icon>inbox</mdw-icon>
                  <div class="mdw-list-item__text">
                    <div class="mdw-list-item__primary-text">Four</div>
                  </div>
                </mdw-list-item>
              </mdw-list>
            </div>
          </mdw-card>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Huge ass list</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-list-item active>
                  <mdw-icon>inbox</mdw-icon>
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
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-list class="mdw-two-line">
                ${this.listHugeData.map(t => `
                  <mdw-list-item ${t.id === 1 ? 'active' : ''}>
                    <mdw-icon>inbox</mdw-icon>
                    <div class="mdw-list-item__text">
                      <div class="mdw-list-item__primary-text">
                        ${t.label}
                      </div>
                      <div class="mdw-list-item__secondary-text">
                        ${t.secondary}
                      </div>
                    </div>
                    <mdw-icon class="mdw-list-item__meta">info</mdw-icon>
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
}
