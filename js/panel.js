import React, {Component} from "react";
import {Panel, Button,} from "react-bootstrap";
import axios from "axios";

import SelectForm from "./select-form";
import MeasurementsTable from "./measurements-table";

export default class PlaceAndParameter extends Component{
    constructor(props){
        super(props);
        
        this.state = {
            countries:[],
            cities:[],
            locations:[],
            parameters:[],
            currentCountryCode:"",
            currentCity:"",
            currentLocation:"",
            currentParameter:"",
            measurements:"",
        };
        
        // we need to use the bind function so we can later have the same scope of the
        // this object as now, in order to access the state.
        this.onSelectChangeCountry = this.onSelectChangeCountry.bind(this);
        this.onSelectChangeCity = this.onSelectChangeCity.bind(this);
        this.onSelectChangeLocations = this.onSelectChangeLocations.bind(this);
        this.onSelectChangeParameter = this.onSelectChangeParameter.bind(this);
        this.onFetchDataClick = this.onFetchDataClick.bind(this);
    }
    
    componentWillMount(){
        var _this = this;
        //whenever we first start, countries and parameters are already set
        // therefore, we have to make both those requests as the component mounts
        axios.get("https://api.openaq.org/v1/countries")
        .then((response)=>{
            _this.setState({countries: response.data.results})
        })
        .catch((error)=>{
            this.props.fetchError(error);
        });
        
        axios.get("https://api.openaq.org/v1/parameters")
            .then ((response)=>{
            _this.setState({parameters:response.data.results});
        })
        .catch((error)=>{
            this.props.fetchError(error);
        });
    }
    
    onSelectChangeCountry(e){
        var _this = this;
        var countryCode = e.target.value;
        //Objective: when the country changes, we need to update the values in the city select box.
        //For this, we first start with a get request to list the cities of the selected country:
        axios.get("https://api.openaq.org/v1/cities?country="+countryCode)
        .then((response)=>{
            _this.setState({
                                cities: response.data.results,
                                currentCountryCode: countryCode
                           });
        })
        .catch((error)=>{
            this.props.fetchError(error);
        });        
    }
    
    onSelectChangeCity(e){
        var _this = this;
        //Objective: when the city changes, we need to update the values in the locations select box.
        //For this, we first start with a get request to list the cities of the selected city:
        var currentCity = e.target.value;
        axios.get("https://api.openaq.org/v1/locations?country="+this.state.currentCountryCode+"&city="+currentCity)
        .then((response)=>{
            _this.setState({
                            locations: response.data.results,
                            currentCity: currentCity
                            });
        })
        .catch((error)=>{
            this.props.fetchError(error);
        });
    }
    
    onSelectChangeLocations(e){
        // For the locations we don't need to update anything else, except the current selected location
        this.setState({currentLocation: e.target.value});
    }
    
    onSelectChangeParameter(e){
        // For the parameter, like the city, we only need to keep track of the current one selected
        this.setState({currentParameter: e.target.value});
    }
    
    onFetchDataClick(e){
        var _this = this;
        // fetchDataUrl is the base URL, when none of the select boxes were changed
        var fetchDataUrl = "https://api.openaq.org/v1/measurements?";
        
        /*If select boxes have been changed, we need to add their new value to fetchDataUrl, to make the
        appropriate request. So we jsut concatenate that data to the base URL currently in fetchDataUrl*/
        if(this.state.currentCountryCode.length>0 && this.state.currentCountryCode!="All countries")
            fetchDataUrl += "country="+this.state.currentCountryCode+"&";
        if(this.state.currentCity.length>0 && this.state.currentCity!="All cities")
            fetchDataUrl += "city="+this.state.currentCity+"&";
        if(this.state.currentLocation.length>0 && this.state.currentLocation!="All locations")    
            fetchDataUrl += "location="+this.state.currentLocation+"&";
        if(this.state.currentParameter.length>0 && this.state.currentParameter!="All parameters")
            fetchDataUrl += "parameter="+this.state.currentParameter;
        
        axios.get(fetchDataUrl)
        .then((response)=>{
            //we pass in the function from the App file so that the measurements data can be passed into
            // the MeasurementTable component
            _this.props.fetchMeasurements(response.data.results);
        })
        .catch((error)=>{
            this.props.fetchError(error);
        });
    }
    
    render(){
       return (
           <div>
           <Panel bsStyle="primary" header="Place & Parameter">
                <SelectForm controlLabel="Country" plural="countries" property="name"
                requestParameter="code" options={this.state.countries} onChange={this.onSelectChangeCountry}/>
                <SelectForm controlLabel="City" plural="cities" property="city"
                requestParameter="city" options={this.state.cities} onChange={this.onSelectChangeCity}/>
                <SelectForm controlLabel="Location" plural="locations" property="location"
                requestParameter="" options={this.state.locations} onChange={this.onSelectChangeLocations}/>
                <SelectForm controlLabel="Parameter" plural="parameters" property="name"
                requestParameter="id" options={this.state.parameters} onChange={this.onSelectChangeParameter}/>
           </Panel>
           <Button bsStyle="primary" onClick={this.onFetchDataClick}>Fetch Data</Button> <br/>
           </div>
       ); 
    }
}
