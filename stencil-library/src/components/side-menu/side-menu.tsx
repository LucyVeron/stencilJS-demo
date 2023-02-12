import { Component, h } from '@stencil/core';

@Component({
  tag: 'side-menu',
  styleUrl: 'side-menu.css',
  shadow: true,
})
export class SideMenu {
  toggleBackground(e: Event) {
    console.log('received event', e);
    document.getElementsByTagName('side-menu')[0].style.display = 'none';
  }
  render() {
    return (
      <div class="side-menu">
        <div class="menu-background"></div>
        <div class="actual-menu">
          <button onClick={e => this.toggleBackground(e)}>X Close</button>
          <slot />
        </div>
      </div>
    );
  }
}
