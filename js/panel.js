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
        
        // we need to use the bind function so we can later have the same scope of the
        // this object as now, in order to access the state.
        this.onSelectChangeCountry = this.onSelectChangeCountry.bind(this);
    }
    
    componentWillMount(){
        var _this = this;
        
        axios.get("https://api.openaq.org/v1/countries")
        .then(function(response){
            _this.setState({countries: response.data.results})
        });
    }
    
    onSelectChangeCountry(e){
     console.log('hiii', e.target.value);
        var _this = this;
        //Objective: when the country changes, we need to update the values in the city select box.
        //For this, we first start with a get request to list the cities of the selected country:
        axios.get("https://api.openaq.org/v1/cities?limit=1000&country="+e.target.value)
        .then(function(response){
            console.log('response:', response);
            _this.setState({cities: response.data.results});
        });
        
    }
    
    render(){
        // TODO: fix the format of the strings so with subscript
       var parameters=["PM 2.5", "PM 10", "SO2", "NO2", "O3", "CO", "BC"];
       return (
           <Panel bsStyle="primary" header="Place & Parameter">
                <SelectForm controlId="countriesId" controlLabel="Country" things="countries" property="name"
                options={this.state.countries} onChange={this.onSelectChangeCountry}/>
                <SelectForm controlId="citiesId" controlLabel="City" things="cities" property="city"
                options={this.state.cities} onChange={this.onSelectChangeCountry}/>
                <SelectForm controlId="locationsId" controlLabel="Location" things="locations" property="location"
                options={this.state.locations} onChange={this.onSelectChangeCountry}/>
                <SelectForm controlId="parametersId" controlLabel="Parameter" things="parameters" property=""
                options={parameters} onChange={this.onSelectChangeCountry}/>
           </Panel>
       ); 
    }
}

class SelectForm extends Component{
    
    render(){
     // TODO: fix the options rendering
        var _this = this;
        
        return (
            <FormGroup controlId={this.props.controlId}>
                <ControlLabel>{this.props.controlLabel}</ControlLabel>
                <FormControl componentClass="select" placeholder={"All "+this.props.things}
                    onChange={this.props.onChange}>
                    <option>{"All "+this.props.things}</option>
                    {
                      this.props.options.map(function(option, key) {
                        /*the way this has been implemented, the parameters options array will not
                        have a property, so we need to check that before rendering the options, using the
                        props.
                        */
                        var code = {}; 
                        if(_this.props.property.length>0){
                            code = option.code; //we need the code to make the search for cities and locations
                            name = option[_this.props.property];
                        }

                      return <option key={key} value={code}>{name}</option>
                      })
                    }
                </FormControl>
                </FormGroup>
        );
    }
}
