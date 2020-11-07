import { Page } from '@webformula/pax-core';

export default class Select extends Page {
  constructor() {
    super();
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

        <a href="https://material.io/components/menus" target="_new">Material Design Guidelines: Input dropdown Menus</a>
        <p>Menus display a list of choices on temporary surfaces</p>

        <div style="display: inline-block">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#standard">Standard</anchor-link>
          <anchor-link selector="#enhanced">Enhanced</anchor-link>
          <anchor-link selector="#outlined">Outlined</anchor-link>
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

          <!-- search -->
          <mdw-card id="search">
            <div class="mdw-card__content">
              <h6>Searchable</h6>
              <div class="description">Make select searchable</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-select
                class="mdw-padding mdw-outlined mdw-flex mdw-shaped mdw-no-float mdw-density-compact"
                mdw-enhanced
                mdw-no-float
              >
                <select>
                  <option value="1">item one</option>
                    <option value="2">item two</option>
                    <option value="3">item three</option>
                    <option value="4">item four</option>
                    <option value="5">item five</option>
                    <option value="3">item six</option>
                    <option value="4">item seven</option>
                    <option value="5">item eight</option>
                    <option value="3">item nine</option>
                    <option value="4">item ten</option>
                    <option value="5">item eleven</option>
                </select>
                <label>Floating label</label>
              </mdw-select>
              </monaco-editor>
            </div>

            <div class="mdw-card__content mdw-row">
              <mdw-select
                class="mdw-padding mdw-outlined mdw-flex mdw-shaped mdw-no-float mdw-density-compact"
                mdw-enhanced
                mdw-no-float
              >
                <select>
                  <option value="1">item one</option>
                    <option value="2">item two</option>
                    <option value="3">item three</option>
                    <option value="4">item four</option>
                    <option value="5">item five</option>
                    <option value="3">item six</option>
                    <option value="4">item seven</option>
                    <option value="5">item eight</option>
                    <option value="3">item nine</option>
                    <option value="4">item ten</option>
                    <option value="5">item eleven</option>
                </select>
                <label>Floating label</label>
              </mdw-select>
              <span class="mdw-flex"></span>
            </div>
          </mdw-card>
        </section>

      </article>
    `;
  }
}
