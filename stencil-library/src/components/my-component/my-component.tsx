import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
})
export class MyComponent {
  render() {
    return (
      <div>
        <h1>My Component</h1>
        <my-card name="Lucy"></my-card>
        <search-word search-text="bmw"></search-word>
        <side-menu></side-menu>
      </div>
    );
  }
}
