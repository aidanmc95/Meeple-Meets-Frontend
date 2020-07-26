import React from "react";
import './mapStyles.css'

class Map extends React.Component {

    componentDidMount() {
        var origin1 = new window.google.maps.LatLng(47.6069014, -122.338528);
        var origin2 = 'Greenwich, England';
        var destinationA = 'Stockholm, Sweden';
        var destinationB = new window.google.maps.LatLng(50.087692, 14.421150);

        let service = window.google.maps.DistanceMatrixService

        service.prototype.getDistanceMatrix(
            {
              origins: [origin1, origin2],
              destinations: [destinationA, destinationB],
              travelMode: 'DRIVING',
            }, callback);

        function callback(response, status) {
            // See Parsing the Results for
            // the basics of a callback function.
            console.log(status)
            console.log(response)
        }

        window.google.maps.Geocoder.prototype.geocode({ location: origin1 }, (results, status) => {
            console.log(status)
            console.log(results)
        });
    }
    

    render(){
        return(
            <div>
                <div id="map"></div>
            </div>
        )
    }
}

export default Map