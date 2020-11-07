import { Page } from '@webformula/pax-core';

export default class Backdrop extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Backdrop';
  }

  template() {
    return /* html */`
      <article class="page-article">
        <h3>Backdrop</h3>

        <!-- <div class="showcase">
        </div> -->


        <section id="types">
          <h4>Types</h4>

          <div class="codecase mdw-elevation-1">
            <div class="title">Basic</div>
            <monaco-editor language="html">
            </monaco-editor>
            <div class="demo">
              <iframe style="margin: auto; width: 320px; height: 560px; border: 1px solid #ddd" src="basic-backdrop.html"></iframe>
            </div>
          </div>

        </section>

      </article>
    `;
  }
}
