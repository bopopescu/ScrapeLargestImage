import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';


class URLCard extends React.Component {
    constructor(props){
        super(props);
        this.url = props.url;
        this.status = props.status;
    }
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                    <Card.Title>{this.url}</Card.Title>
                    <Card.Text>
                        <b>Status:</b> {this.status}
                    </Card.Text>
                    <Button variant="primary">Details</Button>
                    </Card.Body>
            </Card>
          </div>
        );
    }
  }

  export default URLCard;
