import {Page} from "/web_modules/@webformula/pax-core/index.js";
export default class Dialog extends Page {
  constructor() {
    super();
    this.finnigens = `
    <p>riverrun, past Eve and Adam's, from swerve of shore to bend
of bay, brings us by a commodius vicus of recirculation back to
Howth Castle and Environs.</p>
    <p>Sir Tristram, violer d'amores, fr'over the short sea, had passen-
core rearrived from North Armorica on this side the scraggy
isthmus of Europe Minor to wielderfight his penisolate war: nor
had topsawyer's rocks by the stream Oconee exaggerated themselse
to Laurens County's gorgios while they went doublin their mumper
all the time: nor avoice from afire bellowsed mishe mishe to
tauftauf thuartpeatrick: not yet, though venissoon after, had a
kidscad buttended a bland old isaac: not yet, though all's fair in
vanessy, were sosie sesthers wroth with twone nathandjoe. Rot a
peck of pa's malt had Jhem or Shen brewed by arclight and rory
end to the regginbrow was to be seen ringsome on the aquaface.</p>
    <p>The fall (bababadalgharaghtakamminarronnkonnbronntonner-
ronntuonnthunntrovarrhounawnskawntoohoohoordenenthur-
nuk!) of a once wallstrait oldparr is retaled early in bed and later
on life down through all christian minstrelsy. The great fall of the
offwall entailed at such short notice the pftjschute of Finnegan,
erse solid man, that the humptyhillhead of humself prumptly sends
an unquiring one well to the west in quest of his tumptytumtoes:
and their upturnpikepointandplace is at the knock out in the park
where oranges have been laid to rust upon the green since dev-
linsfirst loved livvy.</p>
    <p>What clashes here of wills gen wonts, oystrygods gaggin fishy-
gods! Brékkek Kékkek Kékkek Kékkek! Kóax Kóax Kóax! Ualu
Ualu Ualu! Quaouauh! Where the Baddelaries partisans are still
out to mathmaster Malachus Micgranes and the Verdons cata-
pelting the camibalistics out of the Whoyteboyce of Hoodie
Head. Assiegates and boomeringstroms. Sod's brood, be me fear!
Sanglorians, save! Arms apeal with larms, appalling. Killykill-
killy: a toll, a toll. What chance cuddleys, what cashels aired
and ventilated! What bidimetoloves sinduced by what tegotetab-
solvers! What true feeling for their's hayair with what strawng
voice of false jiccup! O here here how hoth sprowled met the
duskt the father of fornicationists but, (O my shining stars and
body!) how hath fanespanned most high heaven the skysign of
soft advertisement! But was iz? Iseut? Ere were sewers? The oaks
of ald now they lie in peat yet elms leap where askes lay. Phall if
you but will, rise you must: and none so soon either shall the
pharce for the nunce come to a setdown secular phoenish.</p>
    <p>Bygmester Finnegan, of the Stuttering Hand, freemen's mau-
rer, lived in the broadest way immarginable in his rushlit toofar-
back for messuages before joshuan judges had given us numbers
or Helviticus committed deuteronomy (one yeastyday he sternely
struxk his tete in a tub for to watsch the future of his fates but ere
he swiftly stook it out again, by the might of moses, the very wat-
er was eviparated and all the guenneses had met their exodus so
that ought to show you what a pentschanjeuchy chap he was!)
and during mighty odd years this man of hod, cement and edi-
fices in Toper's Thorp piled buildung supra buildung pon the
banks for the livers by the Soangso. He addle liddle phifie Annie
ugged the little craythur. Wither hayre in honds tuck up your part
inher. Oftwhile balbulous, mithre ahead, with goodly trowel in
grasp and ivoroiled overalls which he habitacularly fondseed, like
Haroun Childeric Eggeberth he would caligulate by multiplicab-
les the alltitude and malltitude until he seesaw by neatlight of the
liquor wheretwin 'twas born, his roundhead staple of other days
to rise in undress maisonry upstanded (joygrantit!), a waalworth
of a skyerscape of most eyeful hoyth entowerly, erigenating from</p>
    `;
  }
  get title() {
    return "Dialog";
  }
  get d1() {
    return document.querySelector("#d1");
  }
  showDialog() {
    this.d1.open();
  }
  showDialogWithService() {
    MDWDialog.open({
      title: "Title",
      message: "message message 123",
      okLabel: "ok",
      cancelLabel: "cancel"
    }).then((data) => {
      console.log(data);
    });
  }
  showDialogWithServiceClickoutside() {
    MDWDialog.open({
      title: "Title",
      message: "Try to click background to close",
      okLabel: "ok",
      cancelLabel: "cancel",
      clickOutsideClose: true
    }).then((data) => {
      console.log(data);
    });
  }
  showScrollDialog() {
    MDWDialog.open({
      title: "Title",
      message: this.finnigens,
      okLabel: "ok",
      cancelLabel: "cancel"
    });
  }
  ok() {
    this.d1.close();
  }
  template() {
    return `
      <article class="page-article">
        <h3>Menu</h3>

        <div class="showcase mdw-elevation-1">
          <mdw-button onclick="activePage.showDialogWithService()">open dialog</mdw-button>
        </div>

        <a href="https://material.io/design/components/dialogs.html" target="_new">Material Design Guidlines: Dialogs</a>
        <p>Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.</p>

        <div style="display: inline-block">
          <div class="eyebrow">contents</div>
          <anchor-link selector="#service">Dialog service</anchor-link>
          <anchor-link selector="#with-click">Dialog click background to close</anchor-link>
          <anchor-link selector="#template">Dialog template</anchor-link>
          <anchor-link selector="#scrollable">Dialog scrollable</anchor-link>
        </div>

        <section id="types">
          <h4>Types</h4>

          <!-- contained -->
          <mdw-card id="service">
            <div class="mdw-card__content">
              <h6>Dialog service</h6>
              <div class="description">Use MDWDialog service to create promise based dialog</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="javascript">
                MDWDialog.open({
                  title: 'Title',
                  message: 'message message 123',
                  okLabel: 'ok',
                  cancelLabel: 'cancel'
                }).then(function (data) {
                  console.log(data);
                });
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button class="mdw-raised  mdw-primary" onclick="activePage.showDialogWithService()">open dialog</mdw-button>
            </div>
          </mdw-card>


          <!-- no click out sode to close -->
          <mdw-card id="with-click">
            <div class="mdw-card__content">
              <h6>Dialog with click outside to close</h6>
              <div class="description">Use MDWDialog service to create promise based dialog</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="javascript">
                MDWDialog.open({
                  title: 'Title',
                  message: 'message message 123',
                  okLabel: 'ok',
                  cancelLabel: 'cancel',
                  clickOutsideClose: true
                }).then(function (data) {
                  console.log(data);
                });
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button class="mdw-raised  mdw-primary" onclick="activePage.showDialogWithServiceClickoutside()">open dialog</mdw-button>
            </div>
          </mdw-card>


          <mdw-card id="template">
            <div class="mdw-card__content">
              <h6>Dialog from template</h6>
              <div class="description">Place html dialog in page</div>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-dialog>
                  <mdw-panel>
                    <mdw-dialog-container>
                      <mdw-dialog-title>Title</mdw-dialog-title>
                      <mdw-dialog-content>
                        This is some content
                      </mdw-dialog-content>
                      <mdw-dialog-actions>
                        <mdw-button class="mdw-error" onclick="d1.close()">cancel</mdw-button>
                        <mdw-button onclick="d1.close(true)">ok</mdw-button>
                      </mdw-dialog-actions>
                    </mdw-dialog-container>
                  </mdw-panel>
                </mdw-dialog>

                <!--
                  document.querySelector('#d1').hoistToBody();
                  document.querySelector('#d1').open();
                -->
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button class="mdw-raised  mdw-primary" onclick="activePage.showDialog()">open dialog</mdw-button>
            </div>
          </mdw-card>


          <mdw-card id="scrollable">
            <div class="mdw-card__content">
              <h6>Scrolling dialog</h6>
            </div>

            <div class="mdw-card__content--no-padding">
              <monaco-editor language="html">
                <mdw-dialog>
                  <mdw-panel>
                    <mdw-dialog-container>
                      <mdw-dialog-title>Title</mdw-dialog-title>
                      <mdw-dialog-content>
                        tall text ...
                      </mdw-dialog-content>
                      <mdw-dialog-actions>
                        <mdw-button class="mdw-error" onclick="d1.close()">cancel</mdw-button>
                        <mdw-button onclick="d1.close(true)">ok</mdw-button>
                      </mdw-dialog-actions>
                    </mdw-dialog-container>
                  </mdw-panel>
                </mdw-dialog>
              </monaco-editor>
            </div>

            <div class="mdw-card__content" style="display: block;">
              <mdw-button class="mdw-raised  mdw-primary" onclick="activePage.showScrollDialog()">open dialog</mdw-button>
            </div>
          </mdw-card>


        <mdw-dialog id="d1">
          <mdw-panel mdw-position="center center">
            <mdw-dialog-container>

              <mdw-dialog-title>Title</mdw-dialog-title>

              <mdw-dialog-content>
                This is some content
              </mdw-dialog-content>

              <mdw-dialog-actions>
                <mdw-button class="mdw-error" onclick="d1.close()">cancel</mdw-button>
                <mdw-button onclick="activePage.ok()">ok</mdw-button>
              </mdw-dialog-actions>

            </mdw-dialog-container>
          </mdw-panel>
        </mdw-dialog>

      </article>
    `;
  }
}
