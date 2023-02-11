import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.css',
  shadow: true,
})
export class MyCard {
  @Prop({mutable: true}) name: string;
  @State() apiData: string;
  @State() showCard: boolean = true;

  changeStates() {
    this.name = 'John Doe';
    this.apiData = "we have data from the api";
    this.showCard = false;
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  render() {
    let reactContent = (
      <div>
        <div class="card-custom card-pink" id="react-div">
          <div>Hello from React</div>
          <div>Live Users</div>
          <button class="btn-react small-btn" onClick={this.changeStates.bind(this)}>
            Get React Users
          </button>
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
    if (this.showCard) {
      contentToDisplay = reactContent;
    }

    let mainContent = (
      <div class="my-card-wrapper">
        <h1>Hi, I am {this.name}</h1>

        <h5>{this.apiData}</h5>
        <button class="btn-stencil">Stencil</button>
        <button class="btn-react">React</button>
        {contentToDisplay}
        {stencilContent}
      </div>
    );
    return mainContent;
  }
}