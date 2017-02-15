import React, {Component} from "react";
import {FormGroup, ControlLabel, FormControl} from "react-bootstrap";
export default class SelectForm extends Component{
    
    render(){
        var _this = this;
        return (
            <FormGroup>
                <ControlLabel>{this.props.controlLabel}</ControlLabel>
                <FormControl componentClass="select" placeholder={"All "+this.props.plural}
                    onChange={this.props.onChange}>
                    <option>{"All "+this.props.plural}</option>
                    {
                      this.props.options.map((option, key)=> {
                        // this variable is used as a requets parameter in the request URL, so its origin changes
                        // depending on the form.
                        // For countries: we use the code
                        // For cities: we use the actual city as we already stored the current country code in the state
                        //For parameters: we use the id
                    
                        // we need to initialize both name and request parameter with option
                        // in case we are dealing with parameter, which is just an array of strings
                        var requestParameter = option[_this.props.requestParameter]; // this will be the actual value of what is in the select box
                        var name = option[_this.props.property]; // the name is just what will appear in the select box
                        return (<option key={key} value={requestParameter}>{name}</option>);
                      })
                    }
                </FormControl>
                </FormGroup>
        );
    }
}
