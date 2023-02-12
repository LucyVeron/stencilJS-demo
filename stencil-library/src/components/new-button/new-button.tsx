import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'new-button',
  styleUrl: 'new-button.css',
  shadow: true,
})
export class NewButton {
  @Prop() text: string;
  @Prop() appearance: string;

  render() {
    return (
      <button class={`btn ${this.appearance}`} type="button">
        {/* Slot */}
        {this.text}
      </button>
    );
  }
}
