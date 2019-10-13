import { Page, html } from '@webformula/pax-core';

export default class Browsers extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Browser compatability';
  }

  template() {
    return html`
    <article class="page-article">
      <h3>Browser compatibility</h3>

      <section>
        <h4>Web components</h4>
        <p>PAX components are built using <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" target="_new">web components</a>. Web componets are currently supported by most of the major browsers. If you need to exapnd your browser support there is also a polyfill that exapnds support to IE11.</p>
      </section>

      <section>
        <h4>Pax components support</h4>
        <p>Desktop</p>
        <ul>
          <li>Chrome</li>
          <li>Firefox (version 63)</li>
          <li>Safari</li>
          <li>Opera</li>
          <li>Edge (version 76 Anaheim)</li>
        </ul>

        <p>Mobile</p>
        <ul>
          <li>ios safari</li>
          <li>Android browser</li>
          <li>Chrome for android</li>
          <li>Chrome for ios</li>
          <li>Opera mobile</li>
          <li>Firefox for android</li>
          <li>UC Browser for android</li>
          <li>Samsung internet</li>
        </ul>
      </section>

      <section>
        <a href="#/documentation/theme">next: Theming</a>
      </section>
    </article>
    `;
  }
}
