import React, {Component} from 'react';
import './App.css';
import URLCard from './card.js'
import { Button, Modal, Toast } from 'react-bootstrap';


class App extends Component {

  constructor () {
    super();

    this.state = {
      urlArr: [],
      input: "",
      selectedURL: "",
      selectedIndex: null,
      show: false,
      toastShow: false,
    };
    this.showModal = this.showModal.bind(this);
  }

  showModal (e) {
    console.log("link selected:", e.target.value);
    this.setState({ selectedURL: e.target.value, show: true, selectedIndex: e.target.id});
  }

  // handling the textbox input to set to the state
  handle(event){
    this.setState({
      input: event.target.value
    });
  }

  // onSubmit for the scrape button
  onSubmit (event) {
    event.preventDefault();
    const currentInput = this.state.input
    // initially push a placeholder into the url array
    this.state.urlArr.push({"scrapeurl" : currentInput, "status" : "In Progress"});

    // get today's date to be inserted into the database
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let currentTime = date + ' ' + time;

    // trigger insert url api 
    console.log('https://ta03cezxo7.execute-api.us-west-1.amazonaws.com/prod/inserturlscraper?url=' + this.state.input + '&startTime=' + currentTime);
    let url = 'https://ta03cezxo7.execute-api.us-west-1.amazonaws.com/prod/inserturlscraper?url=' + this.state.input + '&startTime=' + currentTime;
    fetch(url).then(response => {
      console.log('Returned data:', response.status);
      return response;
    }, err => {
      console.log("error due to invalid url", err);
    })
    .then(responseobj => {
      console.log(responseobj);
      fetch('http://localhost:3005/urls').then(response => {
        response.json().then(data => {
            console.log(data);
            this.setState({urlArr: data});
  
        }).catch(error => console.log('Request.json() failed', error));
  
      })
      .catch(error => console.log('Request failed', error));
    })
    .catch(error => console.log('Request process failed', error)); 

    // reset the input to be empty
    this.setState({
      input: ""
    });

  }

  // handle when the modal closes
  handleClose = () => {
    this.setState({ show: false, selectedURL: "", selectedIndex: null, toastShow: false});
  }

  // deletion of a url card
  handleDelete = () => {

    // Call delete api endpoint
    let i = parseInt(this.state.selectedIndex);
    const selectedDate = this.state.urlArr[i].startTime;

    let url = 'https://pnxar4e1qa.execute-api.us-west-1.amazonaws.com/prod/deleteurl' + '?givenDate=' + selectedDate + '&scrapeurl=' + this.state.selectedURL;
    fetch(url).then(response => {
      console.log('👉 Returned data:', response);
      return response;
      }).then(responseobj => {
        console.log(responseobj);
        fetch('http://localhost:3005/urls').then(response => {
          response.json().then(data => {
              console.log('data here is:', data);
              this.setState({urlArr: data});

          }).catch(error => console.log('Request.json() failed', error));
        })
        .catch(error => console.log('Request failed', error));
      })
    .catch(error => console.log('Request process failed', error)); 


    // Close the modal and reset the necessary information in the state
    this.setState({ show: false, selectedURL: "", selectedIndex: null, toastShow: true});
    
  }

  handleToastClose = () => {
    this.setState({toastShow: false});
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
                <br/>
                <b>Status:</b> {this.state.urlArr[i].status}<br/>
                <b>Start Time:</b> {this.state.urlArr[i].startTime}<br/>
                <b>Largest Image URL:</b> {this.state.urlArr[i].largestImage}<br/>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={this.handleDelete}>
                Delete
              </Button>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
  }

  Toast = props => {
    return (
      <Toast onClose={this.handleToastClose} delay={6000} autohide>
        <Toast.Header>
          <strong>Deletion successful</strong>
        </Toast.Header>
        <Toast.Body>Successfully deleted from database!</Toast.Body>
      </Toast>
    );
  }


  render(){
    console.log(this.state);

    const allContents = this.state.urlArr.map((url, i) => 
    <URLCard key={i.toString()} id={i} url={url.scrapeurl} status={url.status} showModal={this.showModal}/>)

    return (
      <div className="App">
        <h1>Enter URL to scrape below!</h1>

        <form ref="form" onSubmit={this.onSubmit.bind(this)}>
          <input type="text" value={this.state.input} onChange={this.handle.bind(this)}/>
          <button type="submit">Scrape</button>
        </form> <br/>

        {
          this.state.toastShow === true ? this.Toast() : null
        }

        <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '20px', marginBottom: '10px'}}>
          {allContents}
        </div>
        {
          this.state.selectedURL === "" ? null : this.Modal()
        }


      </div>
    );
  }

  componentDidMount() {
    fetch('http://localhost:3005/urls')
    .then(response => {
      response.json().then(data => {
          console.log(data);
          this.setState({urlArr: data});

      }).catch(error => console.log('Request failed', error)  
      );

    })
    .catch(error => console.log('Request failed', error)  
    );

  }

}

export default App;
