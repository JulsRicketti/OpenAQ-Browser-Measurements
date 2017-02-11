import React, {Component} from "react";
import {Panel, FormGroup, 
        ControlLabel, FormControl} from "react-bootstrap";
import axios from "axios";

export default class PlaceAndParameter extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            data:[],
            countries:[],
            cities:[],
            locations:[],
            parameters:[],
            error: false
        };
    }
    
    componentWillMount(){
        var _this = this;
        
        axios.get("https://api.openaq.org/v1/countries")
        .then(function(response){
            console.log ("results: ", response.data.results);
            _this.setState({countries: response.data.results})
        });
    }
    
    render(){
       var parameters=["PM 2.5", "PM 10", "SO2", "NO2", "O3", "CO", "BC"];
       return (
           <Panel bsStyle="primary" header="Place & Parameter">
                <SelectForm controlId="countriesId" controlLabel="Country" things="countries" property="name"
                options={this.state.countries}/>
                <SelectForm controlId="citiesId" controlLabel="City" things="cities" property="city"
                options={this.state.cities}/>
                <SelectForm controlId="locationsId" controlLabel="Location" things="locations" property="location"
                options={this.state.locations}/>
                <SelectForm controlId="parametersId" controlLabel="Parameter" things="parameters" property=""
                options={parameters}/>
           </Panel>
       ); 
    }
}

class SelectForm extends Component{
    
    render(){
     // TODO: fix the options rendering           
        console.log ("options:", this.props.options);
        var _this = this;
        
        return (
            <FormGroup controlId={this.props.controlId}>
                <ControlLabel>{this.props.controlLabel}</ControlLabel>
                <FormControl componentClass="select" placeholder={"All "+this.props.things}>
                    <option>{"All "+this.props.things}</option>
                    {
                      this.props.options.map(function(value, key) {
                        /*the way this has been implemented, the parameters options array will not
                        have a property, so we need to check that before rendering the options, using the
                        props.
                        */
                        if(_this.props.property.length>0)
                            value = value[_this.props.property]
                      return <option key={key}>{value}</option>
                      })
                    }
                </FormControl>
                </FormGroup>
        );
    }
}
