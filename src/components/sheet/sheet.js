import { HTMLElementExtended } from '@webformula/pax-core';
import MDWUtils from '../../core/Utils.js';
import { addSwipeListener, removeSwipeListener, disableSwipeListenerForElement, enableSwipeListenerForElement } from '../../core/gestures.js';

customElements.define('mdw-sheet', class extends HTMLElementExtended {
  constructor() {
    super();

    this.currentDragPosition = 0;
    this.bound_onSwipe = this.onSwipe.bind(this);
    this.bound_onScroll = this.onScroll.bind(this);
    this.cloneTemplate();
  }

  connectedCallback() {
    addSwipeListener(this, this.bound_onSwipe);
    this.addEventListener('scroll', this.bound_onScroll);
  }

  disconnectedCallback() {
    removeSwipeListener(this, this.bound_onSwipe);
    this.removeEventListener('scroll', this.bound_onScroll);
  }

  onSwipe(event) {
    switch (event.state) {
      case 'start':
        this.topY = -(this.offsetHeight / 2);
        this.startDragPosition = this.currentDragPosition;
        break;
      case 'move':
        this.dragSheet(this.startDragPosition + event.distance.y);
        break;
      case 'end':
        this.snapPosition(event.velocity.y);
        break;
    }
  }

  dragSheet(y) {
    if (y <= this.topY) {
      y = this.topY;
      this.style.touchAction = '';
      disableSwipeListenerForElement(this);
    }
    if (this.currentDragPosition === y) return;
    this.style.transform = `translate3d(0, ${y}px, 0)`;
    this.currentDragPosition = y;
  }

  snapPosition(velocity) {
    // snap based on velocity (swipe montion)
    if (velocity < -0.7) return this.dragSheet(this.topY);
    if (this.startDragPosition === this.topY && velocity > 0.7) return this.dragSheet(0);

    // snap based on position
    const split = Math.abs(this.topY) / 2;
    if (this.currentDragPosition - this.topY < split) this.dragSheet(this.topY);
    else this.dragSheet(0);
  }

  onScroll(event) {
    if (this.scrollTop === 0) {
      enableSwipeListenerForElement(this);
    }
  }

  styles() {
    return `
      :host {
        position: fixed;
        top: 50%;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: none;

        transform: translateZ(0);
        backface-visibility: hidden;
        perspective: 1000;

        transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
      }

      :host .mdw-sheet-scroll-container {
        display: block;
        background-color: white;
      }

      ::slotted(mdw-sheet-content) {
        display: block;
      }
    `;
  }

  template() {
    return '<div class="mdw-sheet-scroll-container"><slot></slot></div>';
  }
});
