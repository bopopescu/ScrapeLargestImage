import React, {Component} from 'react';
import './App.css';
import URLCard from './card.js'
import { SlowBuffer } from 'buffer';
const mysql = require('mysql');

// import appActions from 'actions/appActions.js'

// function App() {

//   return (
//     <div className="App">
//       {/* <input type="text" onChange = {this.handle.bind(this)}/> */}
//       <URLCard />
//     </div>
//   );
// }


class App extends Component {

  constructor () {
    super();

    this.state = {
      // urlArr: [{"link":"https://imgur.com/search?q=funny","status":"In Progress","startDate":"2019-07-28T07:00:00.000Z"}]
      urlArr: []
    };

    // fetch('http://localhost:3002/urls')
    // .then(response => {
    //   // console.log(response.json());
    //   response.json().then(data => {
    //       console.log(data);
    //       this.setState({urlArr: data});
    //       const stateArr = this.state.urlArr;
    //       console.log(stateArr);
    //       console.log(stateArr[0].link);

    //   }).catch(error => console.log('Request failed', error)  
    //   );

    // })
    // .catch(error => console.log('Request failed', error)  
    // );

    // this.actions = 
  }



  handle(event){
    console.log(event.target.value);
  }

  onSubmit (event) {
    console.log(event.target.value);
    // makeApiCal
    // .then(setState)
  }

  render(){
    // let arr = this.state.urlArr;
    // arr = arr.map((url, i) => {
    //   return <URLCard url={url.url} status={url.status}/>;
    // });
    return (
      <div className="App">
        <h1>Enter URL to scrape below!</h1>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="text" onChange = {this.handle.bind(this)}/>
          <button type="submit">Scrape</button>
        </form>

        {/* {this.state.urlArr.map((url, i) => <li>
          <p key={i}>{url.link}</p>
          <p key={i}>{url.status}</p>
        </li>)} */}
        <div style={{}}>
          {this.state.urlArr.map((url, i) => 
          <URLCard key={i} url={url.link} status={url.status}/>)}
        </div>
      </div>
    );
  }

  componentDidMount() {

    fetch('http://localhost:3002/urls')
    .then(response => {
      // console.log(response.json());
      response.json().then(data => {
          console.log(data);
          this.setState({urlArr: data});
          const stateArr = this.state.urlArr;
          console.log(stateArr);
          console.log(stateArr[0].link);

      }).catch(error => console.log('Request failed', error)  
      );

    })
    .catch(error => console.log('Request failed', error)  
    );

  }

  componentDidUpdate() {
    const temp = this.state.urlArr
  }
}

export default App;
