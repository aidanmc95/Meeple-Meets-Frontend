import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './mapStyles.css'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends React.Component {

    state = {
      location: null,
      zip: null,
      zoom: 11
    }

    componentDidMount() {
      this.markers = [];
      this.mapObj = this.createGoogleMap();
    }

    createGoogleMap() {
      var mapOptions = {
        zoom: 13,
        center: {lat: 47.6085, lng: -122.3364}
      }
      const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
      return map;
    }

    componentDidUpdate() {
      if ((this.props.zip != this.state.zip && this.props.zip) || ( this.props.location != this.state.location && this.props.location)) {
        const newzip = this.props.zip ? this.props.zip : null
        const newlocation = this.props.location ? this.props.location : null
        this.setState({
          location: newlocation,
          zip: newzip
        })
      }
      this.addMap();
    }

    addMap = () => {
      let address = this.state.location ? this.state.location : this.state.zip
      if(address) {
        address = address.toString()
        new window.google.maps.Geocoder.prototype.geocode({ address: address }, (results, status) => {
          const map = this.mapObj;
          if(this.state.location){
            let marker = new window.google.maps.Marker({
              position: results[0].geometry.location,
              map
            });
            map.setCenter(marker.getPosition())
          } else if(this.state.zip) {
            let circle = new window.google.maps.Circle({
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              map,
              center: results[0].geometry.location,
              radius: 1000
            });
            map.setCenter(circle.getCenter())
          }
        });
      }
    }
    
    render() {
        return (
          // Important! Always set the container height explicitly
          <div id="map">

          </div>
        );
      }
    }

export default Map