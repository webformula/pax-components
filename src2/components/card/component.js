import HTMLElementExtended from '../HTMLElementExtended.js';
import './component.css';

// TODO all existing


// TODO expanded card on drag. Look at material guidelines for video
// TODO drag reorder grid


export default class MDWCardElement extends HTMLElementExtended {

  constructor() {
    super();
  }
}

customElements.define('mdw-card', MDWCardElement);
