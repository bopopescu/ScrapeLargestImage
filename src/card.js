import React, {Component} from 'react';
import { Card, Button } from 'react-bootstrap';

class URLCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            url: props.url,
            status: props.status,
            showModal: props.showModal
        }
    }
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                    <Card.Title>{this.state.url}</Card.Title>
                    <Card.Text>
                        <b>Status:</b> {this.state.status}
                    </Card.Text>
                    <Button variant="primary" value={this.state.url} id={this.state.id} onClick={this.state.showModal}>Details</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({id: nextProps.id, url: nextProps.url, status: nextProps.status });   
    }
}

  export default URLCard;
