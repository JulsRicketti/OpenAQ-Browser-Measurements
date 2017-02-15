import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Button, Grid, Row, Col} from "react-bootstrap";

import PlaceAndParameter from "./panel";
import MeasurementsTable from "./measurements-table";

//TODO list:
// get the measurements table to work on this file, it is cleaner this way and I have more freedom with its dimentions
// make sure all variations of requests for the measurements table work
//clean out the code, perhaps add some array functions to make it prettier

//This is where I will put everything together to appear on the screen
class App extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {measurements:""};
        
        this.fetchMeasurements = this.fetchMeasurements.bind(this);
    }
    
    //the only purpose of this function is to get the data from PlaceAndParameter and
    //pass it as props in the measurements table
    fetchMeasurements(measurements){
        this.setState({measurements: measurements});
    }
    
    render(){
        return(
          <Grid>
            <Row><br/></Row>
            <Row>
                <Col sm={3} md={3} lg={3}></Col>
                <Col sm={6} md={6} lg={6}>
                    <PlaceAndParameter fetchMeasurements={this.fetchMeasurements}/>
                </Col>
                <Col sm={3} md={3} lg={3}></Col>
            </Row>
            <Row><br/></Row>
            <Row>
                <Col>
                    <MeasurementsTable measurements={this.state.measurements}/>
                </Col>
            </Row>
          </Grid>

        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("index")
);
