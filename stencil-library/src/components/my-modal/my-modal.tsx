import { Component, Event, EventEmitter, getAssetPath, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-modal',
  styleUrl: 'my-modal.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class MyModal {
  @Prop() closeIcon = 'x.svg';
  @Prop() header: string;
  @Prop() appearance: string;
  @Prop() buttons: string;
  @Prop({
    mutable: true,
    reflect: true,
  })
  isOpen: boolean = false;

  @State() _buttons: Array<any>;

  @Event() private action: EventEmitter;

  arrayDataWatcher(buttons: any) {
    if (typeof buttons === 'string') {
      this._buttons = JSON.parse(buttons);
    } else {
      this._buttons = buttons;
    }
  }

  // Before the component mounts, convert buttons string to array
  componentWillLoad() {
    this.arrayDataWatcher(this.buttons);
    console.log(this.buttons, 'Original');
    console.log(this._buttons, 'New');
  }

  private handleCancel = () => {
    this.isOpen = false;
  };

  private handleAction = () => {
    this.action.emit();
  };

  render() {
    return (
      <div class={this.isOpen ? 'modal-wrapper is-open' : 'modal-wrapper'}>
        <div class="modal-overlay" onClick={this.handleCancel}>
          <div class="modal">
            <div class="header">
              <h6>{this.header}</h6>
              <div class="close" onClick={this.handleCancel}>
                <img src={getAssetPath(`./assets/${this.closeIcon}`)} alt="close icon" />
              </div>
            </div>
            <div class="body">
              <slot />
            </div>
            <div class="footer">
              {this._buttons.map((button, index) => (
                <new-button onClick={index === 0 ? this.handleAction : this.handleCancel} text={button.text} appearance={index === 0 && this.appearance} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
