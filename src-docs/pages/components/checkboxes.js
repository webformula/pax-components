import { Page } from '@webformula/pax-core';

export default class Checkboxes extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Checkboxes';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Checkboxes</h3>

        <div class="showcase mdw-elevation-1" mdw-column>
          <mdw-checkbox indeterminate></mdw-checkbox>

          <!-- can fill in html for browsers that do not support webcomponents -->
          <!-- <mdw-checkbox indeterminate>
            <input type="checkbox">
            <div class="background">
              <div class="checkmark"></div>
              <div class="mixedmark"></div>
            </div>
          </mdw-checkbox> -->
        </div>

        <a href="https://material.io/design/components/selection-controls.html#checkboxes" target="_new">Material Design Guidlines: Checkboxes</a>
        <p>Checkboxes allow the user to select one or more items from a set. Checkboxes can be used to turn an option on or off</p>

        <div class="links">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#unselected" offset="64">Unselected</anchor-link>
          <anchor-link selector="#checked" offset="64">Checked</anchor-link>
          <anchor-link selector="#indeterminate" offset="64">Indeterminate</anchor-link>
          <anchor-link selector="#theming" offset="64">Theming</anchor-link>
        </div>

        <section id="types">
          <h4>States</h4>

          <!-- labels -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>labels</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <span>
                  <label class="mdw-checkbox-label">Label</label>
                  <mdw-checkbox></mdw-checkbox>
                </span>

                <mdw-divider class="mdw-dark mdw-large-padding"></mdw-divider>

                <span>
                  <mdw-checkbox></mdw-checkbox>
                  <label>Label</label>
                </span>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <span>
                <label class="mdw-checkbox-label">Label</label>
                <mdw-checkbox></mdw-checkbox>
              </span>

              <mdw-divider class="mdw-dark mdw-large-padding"></mdw-divider>

              <span>
                <mdw-checkbox></mdw-checkbox>
                <label>Label</label>
              </span>
            </div>
          </mdw-card>


          <!-- Unselected -->
          <mdw-card id="unselected">
            <div class="mdw-card__content">
              <h6>Unselected</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-checkbox></mdw-checkbox>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-checkbox></mdw-checkbox>
            </div>
          </mdw-card>


          <!-- Checked -->
          <mdw-card id="checked">
            <div class="mdw-card__content">
              <h6>Checked</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-checkbox checked></mdw-checkbox>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-checkbox checked></mdw-checkbox>
            </div>
          </mdw-card>

          <!-- Indeterminate -->
          <mdw-card id="indeterminate">
            <div class="mdw-card__content">
              <h6>Indeterminate</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-checkbox indeterminate class="mdw-primary"></mdw-checkbox>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-checkbox indeterminate class="mdw-primary"></mdw-checkbox>
            </div>
          </mdw-card>

        </section>

        <section id="theming">
          <h4>Theming</h4>

          <!-- Colors -->
          <mdw-card>
            <div class="mdw-card__content">
              <h6>Colors</h6>
              <div class="description">The default color for checkboxes is "secondary"</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-checkbox checked></mdw-checkbox>
                <mdw-checkbox checked class="mdw-primary"></mdw-checkbox>
                <mdw-checkbox checked class="mdw-secondary"></mdw-checkbox>
                <mdw-checkbox checked class="mdw-error"></mdw-checkbox>
              </monaco-editor>
            </div>

            <div class="mdw-card__content">
              <mdw-checkbox checked></mdw-checkbox>
              <mdw-checkbox checked class="mdw-primary"></mdw-checkbox>
              <mdw-checkbox checked class="mdw-secondary"></mdw-checkbox>
              <mdw-checkbox checked class="mdw-error"></mdw-checkbox>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
