import React, {Component} from "react";
import {Panel} from "react-bootstrap";

export default class ErrorMessage extends Component{
    render(){
        return(
            <Panel bsStyle="danger" header="Error">
                {this.props.error}
            </Panel>
        );
    }
}