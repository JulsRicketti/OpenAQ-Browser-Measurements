import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Button, Grid, Row, Col} from "react-bootstrap";

import PlaceAndParameter from "./panel";
import MeasurementsTable from "./measurements-table";
import ErrorMessage from "./error";

//This is where I will put everything together to appear on the screen
class App extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {measurements:"", error:""};
        
        // we need to use the bind function so we can later have the same scope of the
        // this object as now, in order to access it's states.
        this.fetchMeasurements = this.fetchMeasurements.bind(this);
        this.fetchError = this.fetchError.bind(this);
    }
    
    //the only purpose of this function is to get the data from PlaceAndParameter and
    //pass it as props in the measurements table
    fetchMeasurements(measurements){
        this.setState({measurements: measurements});
    }
    
    // the only purpose of this function is to get the error message in case it occurs
    // during one of the requests in the PlaceAndParameter component.
    fetchError(error){
       this.setState({error: error});
    }
    
    render(){
        /*If an error occurs, a panel with it is displayed instead of the MeasurementsTable component.
        I also chose to display it even if the MeasurementsTable wasn't requested.
        To do that, we check if there is an error message at all (so whenever the string has a length larger than 0),
        if that is the case, the error will be displayed beneath the PlaceAndParameter panel
        */
        var isThereError = this.state.error.length>0;
        var measurementsTable = (<MeasurementsTable measurements={this.state.measurements}/>);
        var errorMessage = (<ErrorMessage error={this.state.error}/>)
        return(
          <Grid>
            <Row><br/></Row>
            <Row>
                <Col sm={3} md={3} lg={3}></Col>
                <Col sm={6} md={6} lg={6}>
                    <PlaceAndParameter fetchMeasurements={this.fetchMeasurements} fetchError={this.fetchError}/>
                </Col>
                <Col sm={3} md={3} lg={3}></Col>
            </Row>
            <Row><br/></Row>
            <Row>
                <Col>
                    {isThereError ? errorMessage : measurementsTable}
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
