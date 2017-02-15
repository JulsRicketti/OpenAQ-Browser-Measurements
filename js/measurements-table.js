import React, {Component} from "react";
import {Table} from "react-bootstrap";

export default class MeasurementsTable extends Component{
    render(){
        var measurements = this.props.measurements;
        console.log("measurements:", measurements);
        // The measurements props is where the data from the fetch button will
        // be passed. On the Place and Parameter component, we will initialize it
        // as an empty string for ease to check if the request has been made or not.
        // If the data is still empty we will just return null so that there is no table to be rendered.
        if (measurements !== ""){
            var tableBody = (<tbody>
                             {measurements.map(function(item, key){
                                //we need to check if the coordinate property exists
                                var latitude="", longitude="";
                                if (item.coordinates){
                                    latitude = item.coordinates.latitude;
                                    longitude = item.coordinates.longitude;
                                }
                                    
                              
                                return (
                                    <tr key={key}>
                                        <td>{item.location}</td>           
                                        <td>{item.city+", " +item.country}</td>
                                        <td>{item.parameter}</td>
                                        <td>{item.value}</td>
                                        <td>{item.unit}</td>
                                        <td>{latitude+", "+longitude}</td>
                                        <td>{item.date.local}</td>
                                    </tr>
                                );
                             })}
                         </tbody>);
            
        }
        else
            return null;
        return (
         <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>location</th>
            <th>city, country</th>
            <th>parameter</th>
            <th>value</th>
            <th>unit</th>
            <th>coordinates</th>
            <th>date.local</th>
          </tr>
        </thead>
        {tableBody}
      </Table>
        );
    }
}