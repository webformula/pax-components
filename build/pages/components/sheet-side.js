import {Page} from "/web_modules/@webformula/pax-core/index.js";
export default class SheetsSide extends Page {
  constructor() {
    super();
  }
  get title() {
    return "Sheets: side";
  }
  connectedCallback() {
    document.querySelector("#editor-1").content = `
<body>
  <mdw-page>
    <mdw-top-app-bar>
      <section mdw-flex>
        <span class="mdw-title">Example</span>
      </section>
      <section>
        <mdw-icon onclick="document.querySelector('mdw-sheet-side').toggle()">menu</mdw-icon>
      </section>
    </mdw-top-app-bar>

    <mdw-page-content>
      ...content
    </mdw-page-content>
  </mdw-page>

  <mdw-sheet-side id="sideSheet">
    <mdw-header>
      <div class="mdw-title" mdw-flex>Title</div>
      <mdw-button class="mdw-icon" onclick="sideSheet.hide()"">
        <mdw-icon>close</mdw-icon>
      </mdw-button>
    </mdw-header>
    <mdw-content>
      ...content
    </mdw-content>
  </mdw-sheet-side>
</body>
    `;
    document.querySelector("#editor-2").content = `
<body>
  <mdw-page>
    <mdw-top-app-bar>
      <section mdw-flex>
        <span class="mdw-title">Example</span>
      </section>
      <section>
        <mdw-icon onclick="document.querySelector('mdw-sheet-side').toggle()">menu</mdw-icon>
      </section>
    </mdw-top-app-bar>

    <mdw-page-content>
      ...content
    </mdw-page-content>
  </mdw-page>

  <mdw-sheet-side mdw-modal id="sideSheet">
    <mdw-header>
      <div class="mdw-title" mdw-flex>Title</div>
      <mdw-button class="mdw-icon" onclick="sideSheet.hide()"">
        <mdw-icon>close</mdw-icon>
      </mdw-button>
    </mdw-header>
    <mdw-content>
      ...content
    </mdw-content>
  </mdw-sheet-side>
</body>
    `;
    document.querySelector("#editor-3").content = `
<body>
  <mdw-page>
    <mdw-top-app-bar>
      <section mdw-flex>
        <span class="mdw-title">Example</span>
      </section>
      <section>
        <mdw-icon onclick="document.querySelector('mdw-sheet-side').toggle()">menu</mdw-icon>
      </section>
    </mdw-top-app-bar>

    <mdw-page-content>
      ...content
    </mdw-page-content>
  </mdw-page>

  <mdw-sheet-side mdw-scroll id="sideSheet">
    <mdw-header>
      <div class="mdw-title" mdw-flex>Title</div>
      <mdw-button class="mdw-icon" onclick="sideSheet.hide()"">
        <mdw-icon>close</mdw-icon>
      </mdw-button>
    </mdw-header>
    <mdw-content>
      ...content
    </mdw-content>
  </mdw-sheet-side>
</body>
    `;
  }
  handleNavLClick(listItem) {
    const currentActive = document.querySelector("#top-example mdw-list-item[active]");
    if (currentActive)
      currentActive.removeAttribute("active");
    listItem.setAttribute("active", "active");
  }
  template() {
    return `
      <article class="page-article">
        <h3>Sheets: side</h3>

        <a href="https://material.io/components/sheets-side" target="_new">Material Design Guidelines: sheets side</a>
        <p>Side sheets that are modal on mobile, due to limited screen width, can become standard side sheets on tablet and desktop. The reverse is also true.</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#standard" offset="64">Standard</anchor-link>
          <anchor-link selector="#modal" offset="64">Modal</anchor-link>
          <anchor-link selector="#non-fixed" offset="64">Non fixed header</anchor-link>
        </div>


        <section id="types">
          <h4>Types</h4>

          <mdw-card id="standard">
            <div class="mdw-card__content">
              <h6>Standard</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor id="editor-1" language="html"></monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 250px; border: 1px solid #ddd" src="sheets-side-standard.html"></iframe>
              </div>
            </div>
          </mdw-card>

          <mdw-card id="modal">
            <div class="mdw-card__content">
              <h6>Modal</h6>
              <p>Modal is automatically turned on for mobile</p>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html" id="editor-2"></monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 250px; border: 1px solid #ddd" src="sheets-side-modal.html"></iframe>
              </div>
            </div>
          </mdw-card>

          <mdw-card id="non-fixed">
            <div class="mdw-card__content">
              <h6>Non fixed header</h6>
              <p>You can add <b>mdw-sheet-side[mdw-scroll]</b> attribute to the <b>mdw-sheet-side</b> node to make the entire sheet scroll</p>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html" id="editor-3"></monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 250px; border: 1px solid #ddd" src="sheets-side-non-fixed-header.html"></iframe>
              </div>
            </div>
          </mdw-card>
        </section>
      </article>
    `;
  }
}
