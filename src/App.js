import React, {Component} from 'react';
import './App.css';
import URLCard from './card.js'
import { Button, Modal } from 'react-bootstrap';
import { SlowBuffer } from 'buffer';
import axios from "axios";
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
      urlArr: [],
      input: "",
      selectedURL: "",
      selectedIndex: null,
      show: false
    };
    this.showModal = this.showModal.bind(this);
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

  showModal (e) {
    console.log("Did it work? Perhaps", e.target.value);
    this.setState({ selectedURL: e.target.value, show: true, selectedIndex: e.target.id});
  }

  handle(event){
    this.setState({
      input: event.target.value
    });
  }

  onSubmit (event) {
    event.preventDefault();

    try {
        console.log('https://ta03cezxo7.execute-api.us-west-1.amazonaws.com/prod/inserturlscraper?url=' + this.state.input);
        let url = 'https://ta03cezxo7.execute-api.us-west-1.amazonaws.com/prod/inserturlscraper?url=' + this.state.input;
        fetch(url).then(response => {
        console.log('👉 Returned data:', response);
      })
      .catch(error => console.log('Requesty failed', error)  );
      } 
      catch (e) {  console.log(`😱 Axios request failed: ${e}`);
    }

    this.setState({
      input: ""
    });
    console.log('This is where you would submit this.state.input.', 'this.state.input = ' + this.state.input);
    // try {
    //   // const response = await axios.get('https://ta03cezxo7.execute-api.us-west-1.amazonaws.com/prod/inserturlscraper', { posted_data: 'www.googlerer.com' });
    //   fetch('https://ta03cezxo7.execute-api.us-west-1.amazonaws.com/prod/inserturlscraper', { "url" : event.target.value }).then(response => {
    //     console.log('👉 Returned data:', response);
    //   })
    //   .catch(error => console.log('Request failed', error)  );
    // } catch (e) {  console.log(`😱 Axios request failed: ${e}`);
    // }
      
    // makeApiCal
    // .then(setState)
  }

  handleClose = () => {
    this.setState({ show: false, selectedURL: "", selectedIndex: null });
  }
  
  Modal = props => {
    let i = this.state.selectedIndex;
    return (
        <React.Fragment>
          <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" show={this.state.show} onHide={this.handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.selectedURL}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={this.state.urlArr[i].largestImage}></img>
              <div>
                <b>Status:</b> {this.state.urlArr[i].status}<br/>
                <b>Start Date:</b> {this.state.urlArr[i].startDate}<br/>
                <b>Largest Image URL:</b> {this.state.urlArr[i].largestImage}<br/>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
  }

  render(){
    // let arr = this.state.urlArr;
    // arr = arr.map((url, i) => {
    //   return <URLCard url={url.url} status={url.status}/>;
    // });
    console.log(this.state);
    return (
      <div className="App">
        <h1>Enter URL to scrape below!</h1>
        <form ref="form" onSubmit={this.onSubmit.bind(this)}>
          <input type="text" value={this.state.input} onChange={this.handle.bind(this)}/>
          <button type="submit">Scrape</button>
        </form>

        <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '10px'}}>
          {this.state.urlArr.map((url, i) => 
          <URLCard key={i.toString()} id={i} url={url.scrapeurl} status={url.status} showModal={this.showModal}/>)}
        </div>
        {
          this.state.selectedURL === "" ? null : this.Modal()
        }
      </div>
    );
  }

  componentDidMount() {
    // try {
    //   // fetch('https://ta03cezxo7.execute-api.us-west-1.amazonaws.com/prod/inserturlscraper', { "url" : "https://en.wikipedia.org/wiki/Peter_Jeffrey_(RAAF_officer)"}).then(response => {
    //     fetch('https://ta03cezxo7.execute-api.us-west-1.amazonaws.com/prod/inserturlscraper?url=https://en.wikipedia.org/wiki/Peter_Jeffrey_(RAAF_officer)').then(response => {
    //     console.log('👉 Returned data:', response);
    //   })
    //   .catch(error => console.log('Requesty failed', error)  );
    //   } 
    //   catch (e) {  console.log(`😱 Axios request failed: ${e}`);
    // }

    fetch('http://localhost:3003/urls')
    .then(response => {
      // console.log(response.json());
      response.json().then(data => {
          console.log(data);
          this.setState({urlArr: data});
          const stateArr = this.state.urlArr;

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
