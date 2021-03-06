import { Page } from '@webformula/pax-core';

export default class Select extends Page {
  constructor() {
    super();

    this.values = [
      {
        text: 'one',
        value: "1"
      },
      {
        text: 'Two',
        value: "2"
      }
    ];
  }

  get title() {
    return 'Selects';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Selects</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-select mdw-enhanced style="width: 200px" mdw-value="1">
            <select>
              <option value="1">item one</option>
              <option value="2">item two</option>
              <option value="3">item three</option>
              <option value="4">item four</option>
              <option value="5">item five</option>
            </select>
            <label>Floating label</label>
          </mdw-select>
        </div>

        <a href="https://material.io/components/text-fields/" target="_new">Material Design Guidelines: Text fields</a>
        <p>Provide selection that can be used for smaller selection sets</p>

        <div style="display: inline-block">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#standard">Standard</anchor-link>
          <anchor-link selector="#enhanced">Enhanced</anchor-link>
          <anchor-link selector="#outlined">Outlined</anchor-link>
          <anchor-link selector="#shaped">Shaped</anchor-link>
          <anchor-link selector="#search">Search</anchor-link>
          <anchor-link selector="#prog">Set options programmatically</anchor-link>
          <anchor-link selector="#density">Density</anchor-link>
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
              <monaco-editor language="html">
                <mdw-select>
                  <select>
                    <option disabled selected></option>
                    <option value="a">a</option>
                    <option value="b">b</option>
                  </select>
                  <label>Select</label>
                </mdw-select>
              </monaco-editor>
            </div>

            <div class="mdw-card__content mdw-row">
              <mdw-select class="mdw-flex">
                <select>
                  <!-- empty select to start -->
                  <option disabled selected></option>
                  <option value="a">a</option>
                  <option value="b">b</option>
                </select>
                <label>Select</label>
              </mdw-select>
              <span class="mdw-flex"></span>
            </div>
          </mdw-card>

          <!-- enhanced -->
          <mdw-card id="enhanced">
            <div class="mdw-card__content">
              <h6>Enhanced</h6>
              <div class="description">Enhanced material select menu</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
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
              </monaco-editor>
            </div>

            <div class="mdw-card__content mdw-row">
              <mdw-select class="mdw-padding mdw-flex" mdw-enhanced>
                <select>
                  <option value="1" selected>item one</option>
                  <option value="2">item two</option>
                  <option value="3">item three</option>
                  <option value="4">item four</option>
                  <option value="5">item five</option>
                </select>
                <label>Floating label</label>
              </mdw-select>
              <span class="mdw-flex"></span>
            </div>
          </mdw-card>


          <!-- outlined -->
          <mdw-card id="outlined">
            <div class="mdw-card__content">
              <h6>Outlined</h6>
              <div class="description">Use outlined style</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
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
              </monaco-editor>
            </div>

            <div class="mdw-card__content mdw-row">
              <mdw-select class="mdw-padding mdw-outlined mdw-flex" mdw-enhanced>
                <select>
                  <option value="1">item one</option>
                  <option value="2">item two</option>
                  <option value="3">item three</option>
                  <option value="4">item four</option>
                  <option value="5">item five</option>
                </select>
                <label>Floating label</label>
              </mdw-select>
              <span class="mdw-flex"></span>
            </div>
          </mdw-card>

          <!-- shaped -->
          <mdw-card id="shaped">
            <div class="mdw-card__content">
              <h6>Shaped</h6>
              <div class="description">Use shaped style</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-select class="mdw-padding mdw-shaped" mdw-enhanced>
                  <select>
                    <option value="1">item one</option>
                    <option value="2">item two</option>
                    <option value="3">item three</option>
                    <option value="4">item four</option>
                    <option value="5">item five</option>
                  </select>
                  <label>Floating label</label>
                </mdw-select>
              </monaco-editor>
            </div>

            <div class="mdw-card__content mdw-row">
              <mdw-select class="mdw-padding mdw-shaped mdw-flex" mdw-enhanced>
                <select>
                  <option value="1">item one</option>
                  <option value="2">item two</option>
                  <option value="3">item three</option>
                  <option value="4">item four</option>
                  <option value="5">item five</option>
                </select>
                <label>Floating label</label>
              </mdw-select>
              <span class="mdw-flex"></span>
            </div>
          </mdw-card>

          <!-- search -->
          <mdw-card id="search">
            <div class="mdw-card__content">
              <h6>Search</h6>
              <p>add <b>mdw-search</b> attribute</p>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-select class="mdw-padding mdw-outlined" mdw-enhanced mdw-search>
                  <select>
                    <option value="1">item one</option>
                    <option value="2">item two</option>
                    <option value="3">item three</option>
                    <option value="4">item four</option>
                    <option value="5">item five</option>
                  </select>
                  <label>Floating label</label>
                </mdw-select>
              </monaco-editor>
            </div>

            <div class="mdw-card__content mdw-row">
              <mdw-select class="mdw-padding mdw-outlined mdw-flex" mdw-enhanced mdw-search>
                <select>
                  <option value="1">item one</option>
                  <option value="2">item two</option>
                  <option value="3">item three</option>
                  <option value="4">item four</option>
                  <option value="5">item five</option>
                </select>
                <label>Floating label</label>
              </mdw-select>
              <span class="mdw-flex"></span>
            </div>
          </mdw-card>


          <!-- prog -->
          <mdw-card id="prog">
            <div class="mdw-card__content">
              <h6>Set options programmatically</h6>
              <p style="margin-bottom: 4px">Set the <b>mdw-options</b> attribute</p>
              <p>Or set the property <b>document.querySelector('mdw-select').options = []</b></p>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="javascript">
                document.querySelector('mdw-select').options = [
                  {
                    text: 'One',
                    value: "1"
                  },
                  {
                    text: 'Two',
                    value: "2"
                  }
                ]
              </monaco-editor>

              <monaco-editor language="html">
                <mdw-select class="mdw-padding mdw-outlined" mdw-enhanced mdw-options="activePage.values">
                  <label>label</label>
                </mdw-select>
              </monaco-editor>
            </div>

            <div class="mdw-card__content mdw-row">
              <mdw-select style="width: 200px;" class="mdw-padding mdw-outlined" mdw-enhanced mdw-options="activePage.values">
                <label>label</label>
              </mdw-select>
            </div>
          </mdw-card>

          <!-- density -->
          <mdw-card id="density">
            <div class="mdw-card__content">
              <h6>Density</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-select class="mdw-padding" mdw-enhanced>
                  <select>
                    <option value="1">item one</option>
                    <option value="2">item two</option>
                    <option value="3">item three</option>
                    <option value="4">item four</option>
                    <option value="5">item five</option>
                  </select>
                  <label>Floating label</label>
                </mdw-select>

                <mdw-select class="mdw-padding mdw-density-comfortable" mdw-enhanced>
                  <select>
                    <option value="1">item one</option>
                    <option value="2">item two</option>
                    <option value="3">item three</option>
                    <option value="4">item four</option>
                    <option value="5">item five</option>
                  </select>
                  <label>Floating label</label>
                </mdw-select>

                <mdw-select class="mdw-padding mdw-density-compact" mdw-enhanced>
                  <select>
                    <option value="1">item one</option>
                    <option value="2">item two</option>
                    <option value="3">item three</option>
                    <option value="4">item four</option>
                    <option value="5">item five</option>
                  </select>
                  <label>Floating label</label>
                </mdw-select>
              </monaco-editor>
            </div>

            <div class="mdw-card__content mdw-column" style="max-width: 280px">
              <mdw-select class="mdw-padding" mdw-enhanced>
                <select>
                  <option value="1">item one</option>
                  <option value="2">item two</option>
                  <option value="3">item three</option>
                  <option value="4">item four</option>
                  <option value="5">item five</option>
                </select>
                <label>Floating label</label>
              </mdw-select>

              <mdw-select class="mdw-padding mdw-density-comfortable" mdw-enhanced>
                <select>
                  <option value="1">item one</option>
                  <option value="2">item two</option>
                  <option value="3">item three</option>
                  <option value="4">item four</option>
                  <option value="5">item five</option>
                </select>
                <label>Floating label</label>
              </mdw-select>

              <div class="mdw-density-compact mdw-row" style="width: 100%;">
                <mdw-select class="mdw-padding mdw-flex" mdw-enhanced>
                  <select>
                    <option value="1">item one</option>
                    <option value="2">item two</option>
                    <option value="3">item three</option>
                    <option value="4">item four</option>
                    <option value="5">item five</option>
                  </select>
                  <label>Floating label</label>
                </mdw-select>
              </div>
              <span class="mdw-flex"></span>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
