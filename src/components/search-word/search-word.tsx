import { Component, Prop, h, State } from '@stencil/core';

@Component({
  tag: 'search-word',
  styleUrl: 'search-word.css',
  shadow: true,
})
export class SearchWord {
  API_KEY = 'M4A8WOBKS73YRBKR';
  @Prop({ mutable: true }) searchText: string;
  @State() searchResult: { name: string; marketOpen: string }[] = [];
  @State() userInput: string;

  searchFromApi() {
    fetch('https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + this.searchText + '&apikey=' + this.API_KEY)
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        var metaData = parsedRes['bestMatches'];
        this.searchResult = metaData.map(d => {
          return {
            name: d['2. name'],
            marketOpen: d['5. marketOpen'],
          };
        });
        console.log(this.searchResult);
      });
  }

  onUserInput(event: Event) {
    this.userInput = (event.target as HTMLInputElement).value;
    this.searchText = this.userInput;
  }

  componentDidUpdate() {
    console.log('!', this.searchResult);
  }

  render() {
    return (
      <div class="my-card-wrapper">
        <div>
          {/* later */}
          <input class="my-input-textbox" type="text" value={this.searchText} onInput={this.onUserInput.bind(this)} />
          <button class="btn" onClick={this.searchFromApi.bind(this)}>
            Search it!
          </button>
        </div>
        <hr></hr>
        <div>
          <table id="api-table">
            {this.searchResult.map(r => (
              <tr>
                <td>{r.name}</td>
                <td>{r.marketOpen}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
