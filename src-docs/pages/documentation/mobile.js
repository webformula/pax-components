import { Page, html } from '@webformula/pax-core';

export default class Mobile extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Home';
  }

  template() {
    return html`
    <article class="page-article">
      <h3>Mobile</h3>
      <h6>Built for all screens and devices</h6>

      <section>
        <h5>Mobile in mind<h5>
        <p>PAX is built from the ground up with mobile in mind. Not only do all the components work on mobile, they excel! Pax also includes some mobile specific elements (like <a href="#/components/sheets">sheets</a>).</p>
      </section>

      <section>
        <h5>The best of both worlds</h5>
        <p>PAX has a group of components that act appropriatly based on what type of device they are on. Lets take a looks at a few of them.</p>
        <ul>
          <li>
            <a href="#/components/select">Select</a>
            <p>On desktop the select component will present a panel when clicked</p>
            <p>On mobile the select component will present a sheet when clicked</p>
          </li>
          <li>
            <a href="#/components/menu">Menu</a>
            <p>On desktop the menu component will present a panel when clicked</p>
            <p>On mobile the menu component will present a sheet when clicked</p>
          </li>
        </ul>
      </section>

      <section>
        <a href="#/components/buttons">components: Buttons</a>
      </section>
    </article>
    `;
  }
}
