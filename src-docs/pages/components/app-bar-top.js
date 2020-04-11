import { Page } from '@webformula/pax-core';

export default class TopAppBar extends Page {
  constructor() {
    super();

    this.selectedIndexesLength = 0;
    this.bound_onSelect = this.onSelect.bind(this);
  }

  get title() {
    return 'App bar: Top';
  }

  get contextualList() {
    return document.querySelector('mdw-list.contextual');
  }

  get contextualTopAppBar() {
    return document.querySelector('mdw-top-app-bar.contextual');
  }

  connectedCallback() {
    this.contextualList.addEventListener('change', this.bound_onSelect);
  }

  disconnectedCallback() {
    this.contextualList && this.contextualList.removeEventListener('change', this.bound_onSelect);
  }

  onSelect() {
    const selectedIndexes = this.contextualList.selected;
    if (!selectedIndexes || !selectedIndexes.length) return this.contextualTopAppBar.notContextual();

    this.selectedIndexesLength = selectedIndexes.length;
    this.contextualTopAppBar.contextual();
  }

  styles() {
    return `
      .showcase mdw-top-app-bar::after {
        padding-right: 0 !important;
      }
    `;
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>App bar: Top</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-top-app-bar style="width: 400px; position: relative;">
            <section>
                <mdw-icon>menu</mdw-icon>
            </section>

            <section mdw-flex>
                <span class="mdw-title">pax-components</span>
            </section>

            <section>
                <mdw-icon>home</mdw-icon>
            </section>
          </mdw-top-app-bar>
        </div>

        <a href="https://material.io/design/components/app-bars-top.html" target="_new">Material Design Guidelines: Top app bar</a>
        <p>The top app bar displays information and actions relating to the current screen</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#standard" offset="64">Standard</anchor-link>
          <anchor-link selector="#fixed" offset="64">Fixed</anchor-link>
          <anchor-link selector="#prominent" offset="64">Prominent with shrink and animations</anchor-link>
          <anchor-link selector="#contextual" offset="64">Contextual (selection)</anchor-link>
        </div>


        <section id="types">
          <h4>Types</h4>

          <mdw-card id="standard">
            <div class="mdw-card__content">
              <h6>Standard</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-top-app-bar>
                  <section>
                    <mdw-icon>menu</mdw-icon>
                  </section>
                  
                  <section mdw-flex>
                    <span class="mdw-title">Standard</span>
                  </section>
                  
                  <section>
                    <mdw-icon>bookmark</mdw-icon>
                  </section>
                </mdw-top-app-bar>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <iframe style="width: 100%; height: 200px; border: 1px solid #ddd" src="top-app-bar-standard.html"></iframe>
            </div>
          </mdw-card>

          <mdw-card id="fixed">
            <div class="mdw-card__content">
              <h6>Fixed</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-top-app-bar mdw-fixed>
                  <section>
                    <mdw-icon>menu</mdw-icon>
                  </section>

                  <section mdw-flex>
                    <span class="mdw-title">Fixed</span>
                  </section>

                  <section>
                    <mdw-icon>bookmark</mdw-icon>
                  </section>
                </mdw-top-app-bar>
              </monaco-editor>
            </div>
            <div class="mdw-card__content">
              <iframe style="width: 100%; height: 200px; border: 1px solid #ddd" src="top-app-bar-fixed.html"></iframe>
            </div>
          </mdw-card>

          <mdw-card id="prominent">
            <div class="mdw-card__content">
              <h6>Prominent with shrink and animations</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
               <mdw-top-app-bar mdw-prominent mdw-shrink>
                  <section mdw-fixed>
                    <sub-section>
                      <mdw-icon>menu</mdw-icon>
                    </sub-section>
                  </section>
                  
                  <section mdw-flex>
                    <sub-section></sub-section>
                    <sub-section>
                      <span
                        class="mdw-title"
                        mdw-animation-property="transform: scale(#)"
                        mdw-animation-start="1.5"
                        mdw-animation-end="1"
                      >Title</span>
                    </sub-section>
                  </section>
                  
                  <section mdw-fixed>
                    <sub-section>
                      <mdw-icon>more_vert</mdw-icon>
                    </sub-section>
                  </section>
                </mdw-top-app-bar>
              </monaco-editor>
            </div>
            <div class="mdw-card__content">
              <iframe style="width: 100%; height: 280px; border: 1px solid #ddd" src="top-app-bar-prominent.html"></iframe>
            </div>
          </mdw-card>


          <mdw-card id="contextual">
            <div class="mdw-card__content">
              <h6>Contextual</h6>
              <p>The heade can change its background and the inner elements based on context. You can use "mdw-top-app-bar.contextual()" and "mdw-top-app-bar.notContextual()" to toggle between states</p>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="javascript">
                // you can add a change event listener to the list
                //   This will be called when selection changes with an array of selected indexes
                this.listComponent.addEventListener('change', this.bound_onSelect);

                // Toggle on and off contextual state based on list items selected
                onSelect() {
                  const selectedIndexes = this.listComponent.selected;
                  if (!selectedIndexes || !selectedIndexes.length) return this.topAppBarComponent.notContextual();

                  this.selectedIndexesLength = selectedIndexes.length;
                  this.topAppBarComponent.contextual();
                }
              </monaco-editor>
              
              <monaco-editor language="html">
                <mdw-page>
                  <mdw-top-app-bar class="contextual">
                    <section>
                      <mdw-icon>menu</mdw-icon>
                    </section>

                    <section mdw-flex>
                      <!-- use "mdw-not-contextual" attribute to only show when not in contextual mode -->
                      <span class="mdw-title" mdw-not-contextual>Title</span>

                      <!-- use "mdw-contextual" attribute to only show when in contextual mode -->
                      <div mdw-contextual class="mdw-title" style="padding-left: 16px">
                        <mdw-bound-property>selectedIndexesLength</mdw-bound-property>
                        Selected
                      </div>
                    </section>

                    <section>
                      <!-- use "mdw-not-contextual" attribute to only show when not in contextual mode -->
                      <mdw-button mdw-not-contextual class="mdw-icon">
                        <mdw-icon>create</mdw-icon>
                      </mdw-button>
                      
                      <!-- use "mdw-contextual" attribute to only show when in contextual mode -->
                      <mdw-button mdw-contextual class="mdw-icon" onclick="activePage.contextualList.deselectAll()">
                        <mdw-icon>cancel</mdw-icon>
                      </mdw-button>
                    </section>
                  </mdw-top-app-bar>

                  <mdw-content>
                      <mdw-list mdw-select="multiple" class="contextual">
                        <mdw-list-item>
                          <mdw-icon>inbox</mdw-icon>
                          <div class="mdw-list-item__text">
                            <div class="mdw-list-item__primary-text">One</div>
                          </div>
                          <mdw-checkbox class="mdw-list-item__meta"></mdw-checkbox>
                        </mdw-list-item>

                        <mdw-list-item>
                          <mdw-icon>inbox</mdw-icon>
                          <div class="mdw-list-item__text">
                            <div class="mdw-list-item__primary-text">Two</div>
                          </div>
                          <mdw-checkbox class="mdw-list-item__meta"></mdw-checkbox>
                        </mdw-list-item>

                        <mdw-list-item>
                          <mdw-icon>inbox</mdw-icon>
                          <div class="mdw-list-item__text">
                            <div class="mdw-list-item__primary-text">Three</div>
                          </div>
                          <mdw-checkbox class="mdw-list-item__meta"></mdw-checkbox>
                        </mdw-list-item>
                      </mdw-list>
                  </mdw-content>
                </mdw-page>
              </monaco-editor>
            </div>
            <div class="mdw-card__content">
              <mdw-page>
                <mdw-top-app-bar class="contextual">
                  <section>
                    <mdw-icon>menu</mdw-icon>
                  </section>

                  <section mdw-flex>
                    <span class="mdw-title" mdw-not-contextual>Title</span>
                    <div mdw-contextual class="mdw-title" style="padding-left: 16px">
                      <mdw-bound-property>selectedIndexesLength</mdw-bound-property>
                      Selected
                    </div>
                  </section>

                  <section>
                    <mdw-button mdw-not-contextual class="mdw-icon">
                      <mdw-icon>create</mdw-icon>
                    </mdw-button>
                    
                    <mdw-button mdw-contextual class="mdw-icon" onclick="activePage.contextualList.deselectAll()">
                      <mdw-icon>cancel</mdw-icon>
                    </mdw-button>
                  </section>
                </mdw-top-app-bar>

                <mdw-content>
                    <mdw-list mdw-select="multiple" class="contextual">
                      <mdw-list-item>
                        <mdw-icon>inbox</mdw-icon>
                        <div class="mdw-list-item__text">
                          <div class="mdw-list-item__primary-text">One</div>
                        </div>
                        <mdw-checkbox class="mdw-list-item__meta"></mdw-checkbox>
                      </mdw-list-item>

                      <mdw-list-item>
                        <mdw-icon>inbox</mdw-icon>
                        <div class="mdw-list-item__text">
                          <div class="mdw-list-item__primary-text">Two</div>
                        </div>
                        <mdw-checkbox class="mdw-list-item__meta"></mdw-checkbox>
                      </mdw-list-item>

                      <mdw-list-item>
                        <mdw-icon>inbox</mdw-icon>
                        <div class="mdw-list-item__text">
                          <div class="mdw-list-item__primary-text">Three</div>
                        </div>
                        <mdw-checkbox class="mdw-list-item__meta"></mdw-checkbox>
                      </mdw-list-item>
                    </mdw-list>
                </mdw-content>
              </mdw-page>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
