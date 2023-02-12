import { Component, h, Prop, State, Listen } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.css',
  shadow: true,
})
export class MyCard {
  @Prop({ mutable: true }) name: string;
  @State() apiData: string = 'starting value';
  @State() showReactTab = false;
  @State() showStencilTab = false;
  @State() showCard: boolean = true;

  @State() myStencilUsers: string;
  @State() myReactUsers: string;

  API_KEY = 'M4A8WOBKS73YRBKR';

  // @Watch('name')
  // watchHandler(newValue: boolean, oldValue: boolean) {
  //   console.log(`The new value of name is: ${newValue}... old value: ${oldValue}`);
  // }

  // changeStates() {
  //   this.name = 'John Doe';
  //   this.apiData = 'we have data from the api';
  //   this.showCard = false;
  // }

  // connectedCallback() {
  //   console.log('connectedCallback');
  // }

  // disconnectedCallback() {
  //   console.log('disconnectedCallback');
  // }

  // componentWillRender() {
  //   // Always recommended to make rendered state updates here

  //   // this.apiData = "updated"
  //   console.log('componentWillRender');
  // }

  // componentDidLoad() {
  //   // Called once just after component is fully loaded
  //   // and the first render() occurs
  //   console.log('componentDidLoad');
  //   this.apiData = 'API has been updated';
  // }

  // componentShouldUpdate() {
  //   // This hook is called when a component's Prop or State
  //   // property changes and a rerender is about to be requested
  //   console.log('componentShouldUpdate');
  //   return true;
  // }

  // componentDidUpdate() {
  //   console.log('componentDidUpdate - called because we updated this.apiData in componentDidLoad');
  // }

  // componentWillUpdate() {
  //   console.log('componentDidUpdate - called because we will update this.apiData in componentDidLoad');
  // }

  componentWillLoad() {
    this.apiData = 'loading...';
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${this.API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        var metaData = parsedRes['Meta Data'];
        var timeDateStencil = metaData['1. Information'];
        this.apiData = timeDateStencil;
      });
  }

  getStencilUserFromAPI() {
    this.myReactUsers = 'Loading stencil users...';
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${this.API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        var timeSeries = parsedRes['Time Series (5min)'];
        var timeDateReact = timeSeries['2023-02-10 19:45:00'];
        this.myStencilUsers = timeDateReact['5. volume'];
      })
      .catch(err => console.log('error: ', err));
  }

  fetchMyDataFromApi(contentType: string) {
    if (contentType === 'stencil') {
      this.getStencilUserFromAPI();
    } else {
      this.getReactUserFromAPI();
    }
  }

  getReactUserFromAPI() {
    this.myReactUsers = 'Loading react users...';
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${this.API_KEY}`)
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        var timeSeries = parsedRes['Time Series (5min)'];
        var timeDateReact = timeSeries['2023-02-10 19:45:00'];
        console.log(timeSeries);
        this.myReactUsers = timeDateReact['5. volume'];
      })
      .catch(err => console.log('error: ', err));
  }

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

  onUserInput(event: Event) {
    this.name = (event.target as HTMLInputElement).value;
  }

  @Listen('searchWordNameSelected', {target: 'body'})
  searchWordNameSelectedHandler(event: CustomEvent<string>){
    this.name = event.detail;
  }

  render() {
    let reactContent = (
      <div>
        <div class="card-custom card-pink" id="react-div">
          <div>Hello from React</div>
          <div>
            Live Users: <span>{this.myReactUsers}</span>
          </div>
          <button class="btn-react small-btn" onClick={this.fetchMyDataFromApi.bind(this, 'react')}>
            Get React Users
          </button>
        </div>
      </div>
    );

    let stencilContent = (
      <div>
        <div class="card-custom card-blue" id="stencil-div">
          <div>Hello from stencil</div>
          <div>
            Live Users: <span>{this.myStencilUsers}</span>
          </div>
          <button class="btn-stencil small-btn" onClick={this.fetchMyDataFromApi.bind(this, 'stencil')}>
            Get stencil Users
          </button>
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
        <h1>{this.name}</h1>

        <h5>{this.apiData}</h5>
        <button class="btn-stencil" onClick={this.onContentChange.bind(this, 'stenciltab')}>
          Stencil
        </button>
        <button class="btn-react" onClick={this.onContentChange.bind(this, 'reacttab')}>
          React
        </button>
        {contentToDisplay}
        <h></h>
        <h3>Two-way data binding in stencil</h3>

        <input type="text" class="my-input-textbox" onInput={this.onUserInput.bind(this)} value={this.name}></input>
      </div>
    );
    return mainContent;
  }
}
