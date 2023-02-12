import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,
})
export class MyButton {
  @Prop() text: string;
  render() {
    return (
      <div>
        <slot name="title"></slot>
        <button>
          <slot></slot>
          {this.text}
        </button>
      </div>
    );
  }
}
