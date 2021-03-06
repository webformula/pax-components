import { Page } from '@webformula/pax-core';

export default class Drawers extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Navigation drawer';
  }

  handleNavLClick(el) {
    const currents = document.querySelectorAll('.showcase mdw-list-item.mdw-current-link');
    currents.forEach(current => current.classList.remove('mdw-current-link'));
    el.classList.add('mdw-current-link');
  }

  connectedCallback() {
    document.querySelector('#editor-1').content = /* html */`
<body class="mdw-row">
  <mdw-sheet-side class="mdw-navigation-drawer">
    <mdw-header>
      <section>
        <div class="mdw-title">Nav title</div>
        <div class="mdw-subtitle">Pages</div>
      </section>
    </mdw-header>

    <mdw-content>
      <mdw-list>
        <mdw-list-item class="mdw-current-link">
          <mdw-icon>inbox</mdw-icon>
            Inbox
        </mdw-list-item>
        
        <mdw-list-item>
          <mdw-icon>star</mdw-icon>
            Two
        </mdw-list-item>
        
        <mdw-list-item>
          <mdw-icon>star</mdw-icon>
            Three
        </mdw-list-item>
        
        <mdw-divider></mdw-divider>
        
        <mdw-list-item>
          <mdw-icon>star</mdw-icon>
            Four
        </mdw-list-item>
        
        <mdw-list-item>
          <mdw-icon>star</mdw-icon>
            Five
        </mdw-list-item>
        
        <mdw-list-item>
          <mdw-icon>star</mdw-icon>
            Six
        </mdw-list-item>
      </mdw-list>
    </mdw-content>
  </mdw-sheet-side>

  <mdw-scroll-container>
    <mdw-top-app-bar mdw-fixed>
      ...
    </mdw-top-app-bar>

    <div>
      ...PAGE CONTENT
    </div>
  </mdw-scroll-container>
</body>
`;

    document.querySelector('#editor-2').content = /* html */`
<body class="mdw-row">
  <mdw-sheet-side class="mdw-navigation-drawer mdw-primary mdw-no-border">
    <mdw-header>
      <section>
        <div class="mdw-title">Nav title</div>
        <div class="mdw-subtitle">Pages</div>
      </section>
    </mdw-header>

    <mdw-content>
      <mdw-list>
        <mdw-list-item class="mdw-current-link">
          <mdw-icon>inbox</mdw-icon>
            Inbox
        </mdw-list-item>
        
        <mdw-list-item>
          <mdw-icon>star</mdw-icon>
            Two
        </mdw-list-item>
        
        <mdw-list-item>
          <mdw-icon>star</mdw-icon>
            Three
        </mdw-list-item>
        
        <mdw-divider></mdw-divider>
        
        <mdw-list-item>
          <mdw-icon>star</mdw-icon>
            Four
        </mdw-list-item>
        
        <mdw-list-item>
          <mdw-icon>star</mdw-icon>
            Five
        </mdw-list-item>
        
        <mdw-list-item>
          <mdw-icon>star</mdw-icon>
            Six
        </mdw-list-item>
      </mdw-list>
    </mdw-content>
  </mdw-sheet-side>

  <mdw-scroll-container>
    <mdw-top-app-bar mdw-fixed>
      ...
    </mdw-top-app-bar>

    <div>
      ...PAGE CONTENT
    </div>
  </mdw-scroll-container>
</body>
`;
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Navigation drawer</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-sheet-side>
            <mdw-header>
              <section>
                <div class="mdw-title">Nav title</div>
                <div class="mdw-subtitle">Pages</div>
              </section>
            </mdw-header>

            <mdw-content>
              <mdw-list>
                <mdw-list-item class="mdw-current-link" onclick="activePage.handleNavLClick(this)">
                  <mdw-icon>inbox</mdw-icon>
                  Inbox
                </mdw-list-item>

                <mdw-list-item onclick="activePage.handleNavLClick(this)">
                  <mdw-icon>star</mdw-icon>
                  Two
                </mdw-list-item>
              </mdw-list>
            </mdw-content>
          </mdw-sheet-side>
        </div>

        <a href="https://material.io/components/navigation-drawer/" target="_new">Material Design Guidelines: Navigation Drawer</a>
        <p>Navigation drawers provide access to destinations in your app</p>


        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#standard" offset="64">Standard</anchor-link>
          <anchor-link selector="#primary" offset="64">Primary color</anchor-link>
        </div>


        <section id="types">
          <h4>Types</h4>

          <mdw-card id="standard">
            <div class="mdw-card__content">
              <h6>Standard</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html" id="editor-1"></monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="drawer-standard.html"></iframe>
              </div>
            </div>
          </mdw-card>


          <mdw-card id="primary">
            <div class="mdw-card__content">
              <h6>Standard primary color</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html" id="editor-2"></monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <div class="demo">
                <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="drawer-standard-primary.html"></iframe>
              </div>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
