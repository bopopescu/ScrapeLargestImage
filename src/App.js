import React, {Component} from 'react';
import './App.css';
import URLCard from './card.js'
import { SlowBuffer } from 'buffer';
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

  render(){
    // let arr = this.state.urlArr;
    // arr = arr.map((url, i) => {
    //   return <URLCard url={url.url} status={url.status}/>;
    // });
    return (
      <div className="App">
        <h1>Enter URL to scrape below!</h1>
        <input type="text" onChange = {this.handle.bind(this)}/>

        {/* {this.state.urlArr.map((url, i) => <li>
          <p key={i}>{url.link}</p>
          <p key={i}>{url.status}</p>
        </li>)} */}

        {this.state.urlArr.map((url, i) => 
        <URLCard key={i} url={url.link} status={url.status}/>)}
        
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
}

export default App;
