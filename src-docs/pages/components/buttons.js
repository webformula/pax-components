import { Page} from '/web_modules/@webformula/pax-core';

export default class Buttons extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Buttons';
  }

  mockWait(button) {
    if (button.pending) return;
    setTimeout(() => {
      button.resolve();
    }, 3000);
  }

  setBoarderRadius(inputElement) {
    document.documentElement.style.setProperty('--mdw-theme--button-shape-radius', inputElement.value);
  }

  styles() {
    return /* css */`
      .page-article mdw-button {
        margin: 8px;
      }
    `;
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Buttons</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-button id="basic">basic</mdw-button>
          <mdw-button class="mdw-contained mdw-primary">contained</mdw-button>
        </div>

        <a href="https://material.io/design/components/buttons.html" target="_new">Material Design Guidelines: Buttons</a>
        <p>Buttons allow users to take actions, and make choices, with a single tap</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#contained" offset="64">Contained button</anchor-link>
          <anchor-link selector="#outlined" offset="64">Outlined button</anchor-link>
          <anchor-link selector="#shaped" offset="64">Shaped button</anchor-link>
          <anchor-link selector="#async" offset="64">Async with spinner</anchor-link>
          <anchor-link selector="#icons" offset="64">Buttons with icons</anchor-link>
          <anchor-link selector="#theming" offset="64">Theming</anchor-link>
        </div>

        <section id="types">
          <h4>Types</h4>

          <!-- contained -->
          <mdw-card id="contained">
            <div class="mdw-card__content">
              <h6>Contained button</h6>
              <div class="description">Contained buttons have more emphasis, as they use use a color fill and shadow</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-button class="mdw-contained">contained</mdw-button>
                <mdw-button class="mdw-contained mdw-primary">contained primary</mdw-button>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="contained" class="mdw-contained">contained</mdw-button>
              <mdw-button id="contained-primary" class="mdw-contained  mdw-primary">contained primary</mdw-button>
            </div>
          </mdw-card>


          <!-- Outlined -->
          <mdw-card id="outlined">
            <div class="mdw-card__content">
              <h6>Outlined button</h6>
              <div class="description">Outlined buttons are used for more emphasis than text buttons due to the stroke</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-button class="mdw-outlined">outlined</mdw-button>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="outlined" class="mdw-outlined">outlined</mdw-button>
            </div>
          </mdw-card>


          <!-- shaped -->
          <mdw-card id="shaped">
            <div class="mdw-card__content">
              <h6>Shaped button</h6>
              <a href="https://material.io/design/shape/about-shape.html">Material Design Guidelines: Shape</a>
              <div class="description">Material surfaces can be displayed in different shapes. Shapes direct attention, identify components, communicate state, and express brand</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-button class="mdw-shaped mdw-contained mdw-primary">shaped contained</mdw-button>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="shaped" class="mdw-shaped mdw-contained mdw-primary">shaped contained</mdw-button>
            </div>
          </mdw-card>


          <!-- async -->
          <mdw-card id="async">
            <div class="mdw-card__content">
              <h6>Async with spinner</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-button id="async-button" class="mdw-contained mdw-primary" mdw-async onclick="activePage.mockWait(this)">Async</mdw-button>
              </monaco-editor>
              <monaco-editor language="javascript">
                class Buttons extends Page {
                  constructor() {
                    super();
                  }

                  mockWait(button) {
                    if (button.pending) return;
                    setTimeout(() => {
                      button.resolve();
                    }, 3000);
                  }
                }
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="async-button" class="mdw-contained mdw-primary" mdw-async onclick="activePage.mockWait(this)">Async</mdw-button>
            </div>
          </mdw-card>


          <!-- icons -->
          <mdw-card id="icons">
            <div class="mdw-card__content">
              <h6>Buttons with icons</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-button>
                  <mdw-icon>star</mdw-icon>
                  Icon
                </mdw-button>

                <mdw-button class="mdw-contained mdw-primary mdw-icon">
                  <mdw-icon>star</mdw-icon>
                </mdw-button>

                <mdw-button class="mdw-icon">
                  <mdw-icon>add</mdw-icon>
                </mdw-button>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button id="icon" class="mdw-contained mdw-primary">
                <mdw-icon>star</mdw-icon>
                Icon
              </mdw-button>

              <mdw-button class="mdw-contained mdw-primary mdw-icon">
                <mdw-icon>star</mdw-icon>
              </mdw-button>

              <mdw-button class="mdw-icon">
                <mdw-icon>add</mdw-icon>
              </mdw-button>
            </div>
          </mdw-card>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Disabled</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-button disabled class="mdw-primary">Disabled</mdw-button>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button disabled class="mdw-primary">Disabled</mdw-button>
            </div>
          </mdw-card>
        </section>


        <section id="theming">
          <h4>Theming</h4>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Colors</h6>
              <div class="mdw-subtitle">Buttons can use the primary, secondary and error colors configured in the theme</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-button class="">base</mdw-button>
                <mdw-button class=" mdw-primary">primary</mdw-button>
                <mdw-button class=" mdw-secondary">secondary</mdw-button>
                <mdw-button class=" mdw-error">error</mdw-button>

                <mdw-button class="mdw-outlined">base</mdw-button>
                <mdw-button class="mdw-outlined mdw-primary">primary</mdw-button>
                <mdw-button class="mdw-outlined mdw-secondary">secondary</mdw-button>
                <mdw-button class="mdw-outlined mdw-error">error</mdw-button>
                
                <mdw-button class="mdw-contained">base</mdw-button>
                <mdw-button class="mdw-contained mdw-primary">primary</mdw-button>
                <mdw-button class="mdw-contained mdw-secondary">secondary</mdw-button>
                <mdw-button class="mdw-contained mdw-error">error</mdw-button>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div mdw-column>
                <div mdw-row>
                  <mdw-button class="">base</mdw-button>
                  <mdw-button class=" mdw-primary">primary</mdw-button>
                  <mdw-button class=" mdw-secondary">secondary</mdw-button>
                  <mdw-button class=" mdw-error">error</mdw-button>
                </div>
                <div mdw-row>
                  <mdw-button class="mdw-outlined">base</mdw-button>
                  <mdw-button class="mdw-outlined mdw-primary">primary</mdw-button>
                  <mdw-button class="mdw-outlined mdw-secondary">secondary</mdw-button>
                  <mdw-button class="mdw-outlined mdw-error">error</mdw-button>
                </div>
                <div mdw-row>
                  <mdw-button class="mdw-contained">base</mdw-button>
                  <mdw-button class="mdw-contained mdw-primary">primary</mdw-button>
                  <mdw-button class="mdw-contained mdw-secondary">secondary</mdw-button>
                  <mdw-button class="mdw-contained mdw-error">error</mdw-button>
                </div>
              </div>
            </div>
          </mdw-card>

          <mdw-card>
            <div class="mdw-card__content">
              <h6>Shaped</h6>
              <div class="mdw-subtitle"> You can adjust the shaped button radius using the css variable <i>--mdw-theme--button-shape-radius</i></div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="css">
                /* set property on the body: default is 18px */
                body {
                  -mdw-theme--button-shape-radius: 18px;
                }
              </monaco-editor>
              <monaco-editor language="html">
                <mdw-button class="mdw-contained mdw-secondary mdw-shaped">base</mdw-button>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-textfield>
                <label>--mdw-theme--button-shape-radius</label>
                <input oninput="activePage.setBoarderRadius(this)" value="18px" />
              </mdw-textfield>
              <mdw-button class="mdw-contained mdw-secondary mdw-shaped">base</mdw-button>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
