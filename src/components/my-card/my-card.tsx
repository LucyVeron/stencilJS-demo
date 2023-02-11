import { Component, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.css',
  shadow: true,
})
export class MyCard {
  @Prop({ mutable: true }) name: string;
  @State() apiData: string;
  @State() showReactTab = false;
  @State() showStencilTab = false;
  @State() showCard: boolean = true;

  // @Watch('name')
  // watchHandler(newValue: boolean, oldValue: boolean) {
  //   console.log(`The new value of name is: ${newValue}... old value: ${oldValue}`);
  // }

  // changeStates() {
  //   this.name = 'John Doe';
  //   this.apiData = 'we have data from the api';
  //   this.showCard = false;
  // }

  // componentWillUpdate() {
  //   console.log('componentWillUpdate');
  // }

  onContentChange(content: string) {
    if (content === 'reacttab') {
      this.showReactTab = true;
      this.showStencilTab = false;
    } else if (content === 'stenciltab') {
      this.showReactTab = false;
      this.showStencilTab = true;
    } else {
      this.showReactTab = false;
      this.showStencilTab = false;
    }
  }

  render() {
    let reactContent = (
      <div>
        <div class="card-custom card-pink" id="react-div">
          <div>Hello from React</div>
          <div>Live Users</div>
          <button class="btn-react small-btn">Get React Users</button>
        </div>
      </div>
    );

    let stencilContent = (
      <div>
        <div class="card-custom card-blue" id="stencil-div">
          <div>Hello from stencil</div>
          <div>Live Users</div>
          <button class="btn-stencil small-btn">Get stencil Users</button>
        </div>
      </div>
    );

    let contentToDisplay = '';
    if (this.showReactTab) {
      contentToDisplay = reactContent;
    } else if (this.showStencilTab) {
      contentToDisplay = stencilContent;
    }

    let mainContent = (
      <div class="my-card-wrapper">
        <h1>Hi, I am {this.name}</h1>

        <h5>{this.apiData}</h5>
        <button class="btn-stencil" onClick={this.onContentChange.bind(this, 'stenciltab')}>
          Stencil
        </button>
        <button class="btn-react" onClick={this.onContentChange.bind(this, 'reacttab')}>
          React
        </button>
        {contentToDisplay}
      </div>
    );
    return mainContent;
  }
}
