import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './mapStyles.css'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component {

    componentDidMount() {
        // var origin1 = new window.google.maps.LatLng(47.6069014, -122.338528);
        // var origin2 = 'Greenwich, England';
        // var destinationA = 'Stockholm, Sweden';
        // var destinationB = new window.google.maps.LatLng(50.087692, 14.421150);

        // let service = window.google.maps.DistanceMatrixService

        // service.prototype.getDistanceMatrix(
        //     {
        //       origins: [origin1, origin2],
        //       destinations: [destinationA, destinationB],
        //       travelMode: 'DRIVING',
        //     }, callback);

        // function callback(response, status) {
        //     // See Parsing the Results for
        //     // the basics of a callback function.
        //     console.log(status)
        //     console.log(response)
        // }

        // window.google.maps.Geocoder.prototype.geocode({ location: origin1 }, (results, status) => {
        //     console.log(status)
        //     console.log(results)
        // });
    }
    
    static defaultProps = {
        center: {
          lat: 47.6069014,
          lng: -122.338528
        },
        zoom: 11
      };
    
      render() {
        return (
          // Important! Always set the container height explicitly
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_MAP_KEY  }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
              <AnyReactComponent
                lat={47.6069014}
                lng={-122.338528}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        );
      }
    }

export default Map