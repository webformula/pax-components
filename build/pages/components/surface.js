import {Page} from "/web_modules/@webformula/pax-core/index.js";
export default class Surface extends Page {
  constructor() {
    super();
    this.basicTemplate = `
        <mdw-header>
          <section style="width: 64px">
            <mdw-button onclick="MDWSurface.close(); event.stopPropagation()" class="mdw-icon"><mdw-icon>close</mdw-icon></mdw-button>
          </section>
          
          <section mdw-flex>
            <div class="mdw-title">Main title</div>
            <div class="mdw-subtitle">Sub title</div>
          </section>

          <section>
            <div class="mdw-detail-text">Secondary title</div>
          </section>
        </mdw-header>

        <mdw-content>
          <mdw-list>
            <mdw-list-item>One</mdw-list-item>
            <mdw-list-item>Two</mdw-list-item>
            <mdw-list-item>Three</mdw-list-item>
            <mdw-list-item>Four</mdw-list-item>
            <mdw-list-item>Five</mdw-list-item>
          </mdw-list>
        </mdw-content>
      `;
  }
  get title() {
    return "Surfaces";
  }
  connectedCallback() {
    [...document.querySelectorAll(".editor-templates")].forEach((el) => el.content = `const basicTemplate = \`
      < mdw - header >
      <section style="width: 64px">
        <mdw-button onclick="MDWSurface.close(); event.stopPropagation()" class="mdw-icon"><mdw-icon>close</mdw-icon></mdw-button>
      </section>

      <section mdw-flex>
        <div class="mdw-title">Main title</div>
        <div class="mdw-subtitle">Sub title</div>
      </section>

      <section>
        <div class="mdw-detail-text">Secondary title</div>
      </section>
        </mdw - header >

      <mdw-content>
        <mdw-list>
          <mdw-list-item>One</mdw-list-item>
          <mdw-list-item>Two</mdw-list-item>
          <mdw-list-item>Three</mdw-list-item>
          <mdw-list-item>Four</mdw-list-item>
          <mdw-list-item>Five</mdw-list-item>
        </mdw-list>
      </mdw-content>
      \`;`);
  }
  openPanel(target) {
    MDWSurface.open({
      component: "panel",
      animationTarget: target,
      template: this.basicTemplate
    });
  }
  openSheetBottom() {
    MDWSurface.open({
      component: "sheetBottom",
      template: this.basicTemplate
    });
  }
  openSheetSide() {
    MDWSurface.open({
      component: "sheetSide",
      template: this.basicTemplate
    });
  }
  openUsingDefaults(target) {
    MDWSurface.open({
      animationTarget: target,
      template: this.basicTemplate
    });
  }
  openUsingSheets(target) {
    MDWSurface.open({
      mobileComponent: "sheetBottom",
      desktopComponent: "sheetSide",
      animationTarget: target,
      template: this.basicTemplate
    });
  }
  template() {
    return `
      <article class="page-article">
        <h3>Surfaces</h3>
        <p>Surfaces allow you to interact with multiple components. The components can be configured based on mobile vs desktop</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#one" offset="64">Panel Surface</anchor-link>
          <anchor-link selector="#two" offset="64">Sheet bottom surface</anchor-link>
          <anchor-link selector="#three" offset="64">Sheet side surface</anchor-link>
          <anchor-link selector="#four" offset="64">Defaults surface</anchor-link>
          <anchor-link selector="#five" offset="64">Mobile/Desktop configured surface</anchor-link>
        </div>


        <!-- panel -->
        <mdw-card id="one">
          <div class="mdw-card__content">
            <h6>Panel surface</h6>
            <div class="description">Surface using panel component</div>
          </div>

          <div class="mdw-card__content--no-padding">
            <!--
            <monaco-editor language="html" class="editor-templates"></monaco-editor>
            -->
            <monaco-editor language="javascript" id="vs-one">
              <mdw-button onclick="activePage.openPanel(this)">open</mdw-button>

              function openPanel(target) {
                MDWSurface.open({
                  component: 'panel',
                  target,
                  template: this.basicTemplate,
                  
                  // default animation config for panel
                  animation: {
                    type: 'height',
                    origin: 'center',
                    fullscreen: true
                  },
                });
              }
            </monaco-editor>
          </div>

          <div class="mdw-card__content" style="display: block; overflow: visible;">
            <mdw-button onclick="activePage.openPanel(this)">open</mdw-button>
          </div>
        </mdw-card>

        <!-- bottom sheet -->
        <mdw-card id="two">
          <div class="mdw-card__content">
            <h6>Sheet bottom surface</h6>
            <div class="description">Surface using sheetBottom component</div>
          </div>

          <div class="mdw-card__content--no-padding">
            <monaco-editor language="javascript" id="vs-one">
              <mdw-button onclick="activePage.openSheetBottom()">open</mdw-button>

              function openSheetBottom() {
                MDWSurface.open({
                  component: 'sheetBottom',
                  template: this.basicTemplate
                });
              }
            </monaco-editor>
          </div>

          <div class="mdw-card__content" style="display: block; overflow: visible;">
            <mdw-button onclick="activePage.openSheetBottom()">open</mdw-button>
          </div>
        </mdw-card>


        <!-- side sheet -->
        <mdw-card id="three">
          <div class="mdw-card__content">
            <h6>Sheet side surface</h6>
            <div class="description">Surface using sheetSide component</div>
          </div>

          <div class="mdw-card__content--no-padding">
            <monaco-editor language="javascript" id="vs-one">
              <mdw-button onclick="activePage.openSheetSide()">open</mdw-button>
              function openSheetSide() {
                MDWSurface.open({
                  component: 'sheetSide',
                  template: this.basicTemplate
                });
              }
            </monaco-editor>
          </div>

          <div class="mdw-card__content" style="display: block; overflow: visible;">
            <mdw-button onclick="activePage.openSheetSide()">open</mdw-button>
          </div>
        </mdw-card>

        <!-- defaults -->
        <mdw-card id="four">
          <div class="mdw-card__content">
            <h6>Defaults surface</h6>
            <div class="description">On desktop this will show a side sheet, on mobile it will show a panel</div>
          </div>

          <div class="mdw-card__content--no-padding">
            <monaco-editor language="javascript" id="vs-one">
              <mdw-button onclick="activePage.openUsingDefaults(this)">open</mdw-button>

              function openUsingDefaults(target) {
                MDWSurface.open({
                  target,
                  template: this.basicTemplate
                });
              }
            </monaco-editor>
          </div>

          <div class="mdw-card__content" style="display: block; overflow: visible;">
            <mdw-button onclick="activePage.openUsingDefaults(this)">open</mdw-button>
          </div>
        </mdw-card>


        <!-- sheets -->
        <mdw-card id="five">
          <div class="mdw-card__content">
            <h6>Mobile/Desktop configured surface</h6>
            <div class="description">On desktop this will show a side sheet, on mobile it will show a bottom sheet</div>
          </div>

          <div class="mdw-card__content--no-padding">
            <monaco-editor language="javascript" id="vs-one">
              <mdw-button onclick="activePage.openUsingSheets(this)">open</mdw-button>

              function openUsingSheets(target) {
                MDWSurface.open({
                  mobileComponent: 'sheetBottom',
                  desktopComponent: 'sheetSide',
                  target,
                  template: this.basicTemplate,
                });
              }
            </monaco-editor>
          </div>

          <div class="mdw-card__content" style="display: block; overflow: visible;">
            <mdw-button onclick="activePage.openUsingSheets(this)">open</mdw-button>
          </div>
        </mdw-card>

      </article>
    `;
  }
}
