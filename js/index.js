import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Button, Grid, Row, Col} from "react-bootstrap";

import PlaceAndParameter from "./panel"

//This is where I will put everything together to appear on the screen
class App extends Component{
  render(){
    return(
      <Grid>
        <Row><br/></Row>
        <Row>
            <Col sm={3} md={3} lg={3}></Col>
            <Col sm={6} md={6} lg={6}>
                <PlaceAndParameter />
            </Col>
            <Col sm={3} md={3} lg={3}></Col>
        </Row>
      </Grid>

    );
  }
}

ReactDOM.render(
    <App />,
    document.getElementById("index")
);
