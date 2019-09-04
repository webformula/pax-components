import { Page, html } from '@webformula/pax-core';

export default class Banners extends Page {
  constructor() {
    super();
  }

  get title() {
    return 'Banners';
  }

  makeBanner() {
    MDWBanner.create({
      message: 'This is a message and it is awesome!'
    }).then(() => console.log('banner dismissed'));
  }

  makeBannerWithAccept() {
    MDWBanner.create({
      message: 'This is a message and it is awesome!',
      acceptLabel: 'accept'
    }).then(accepted => {
      if (accepted) console.log('banner accepted');
      else console.log('banner dismissed');
    });
  }

  template() {
    return html`
      <article class="page-article">
        <h3>Banners</h3>

        <div class="showcase">
          <!-- you can use id to reference the components class -->
          <!-- you can also walk the tree this.parentNode.parentNode.dismiss()-->
          <!-- <mdw-banner id="banner1" style="display: none;">
            <div>This is a message and it is awsome!</div>
            <div>
              <mdw-button>got it</mdw-button>
              <mdw-button onclick="banner1.dismiss()">dismiss</mdw-button>
            </div>
          </mdw-banner> -->
        </div>

        <a href="https://material.io/design/components/banners.html">Material Design Guidlines: Banners</a>
        <p>A banner displays a prominent message and related optional actions. Banners are more important than snackbars but leess important then dialogs.</p>

        <!-- <div class="column">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#Types">Types</anchor-link>
          <anchor-link selector="#theming">Theming</anchor-link>
        </div> -->

        <section id="types">
          <h4>Examples</h4>

          <div class="codecase">
            <div class="title">Banner service</div>
            <div class="description">Banners must be dissmissed by the user</div>
            <code-mirror mode="javascript">
              // MDWBanner is globally available
              // Only 1 item will show at a time
              //   The rest of the items are queued up and will
              //   automatically display when the current item is removed
              makeBanner() {
                MDWBanner.create({
                  message: 'This is a message and it is awesome!'
                }).then(function () { console.log('banner dismissed'); });
              }

              makeBannerWithAccept() {
                MDWBanner.create({
                  message: 'This is a message and it is awesome!',
                  acceptLabel: 'accept'
                }).then(function (accepted) {
                  if (accepted) console.log('banner accepted');
                  else console.log('banner dismissed');
                });
              };
            </code-mirror>
            <div class="demo">
              <mdw-button onclick="$Banners.makeBanner()">show banner</mdw-button>
              <mdw-button class="mdw-secondary" onclick="$Banners.makeBannerWithAccept()">show banner with acceptLabel</mdw-button>
            </div>
          </div>

        </section>

        <!-- <section id="theming">
          <h4>Theming</h4>

          <div class="codecase">
            <div class="title">Colors</div>
            <code-mirror mode="html">
              <mdw-button raised>base</mdw-button>
              <mdw-button raised class="primary">primary</mdw-button>
              <mdw-button raised class="secondary">secondary</mdw-button>
              <mdw-button raised class="error">error</mdw-button>
            </code-mirror>
            <div class="demo">
              <mdw-button raised>base</mdw-button>
              <mdw-button raised class="primary">primary</mdw-button>
              <mdw-button raised class="secondary">secondary</mdw-button>
              <mdw-button raised class="error">error</mdw-button>
            </div>
          </div>
        </section> -->

      </article>
    `;
  }
}
