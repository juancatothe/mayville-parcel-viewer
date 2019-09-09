import React, { Component } from 'react';

import MapGL, { FlyToInterpolator } from 'react-map-gl';

import centroid from '@turf/centroid';

import './App.css';
import ParcelDetails from './ParcelDetails';

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVhbmNhdG90aGUiLCJhIjoiY2p1MW9lYzdrMDN1MTN5cGVyYXVhMGw3NSJ9.8m02a0ot4-sQBBz7OfU0ng';

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      viewport: {
        latitude: 43.336339,
        longitude: -83.360,
        zoom: 14,
        bearing: 0,
        pitch: 0,
        width: window.innerWidth,
        height: window.innerHeight
      },
      settings: {
        dragPan: true,
        scrollZoom: true,
        touchZoom: true,
        touchRotate: true,
        keyboard: true,
        doubleClickZoom: true,
        minZoom: 11,
        maxZoom: 19,
        minPitch: 0,
        maxPitch: 0
      },
      mapStyle: 'mapbox://styles/juancatothe/cjzxknl0j1u0x1cov0b2jw8mr',
      acres: null,
      ownerName: null,
      ownerAddress1: null,
      ownerAddress2: null,
      PIN: null,
      coords: null
    }
  }

  _onViewportChange = viewport => this.setState({viewport});

  _onClick = (event) => {
    console.log(event);
    if(event.features.length > 0) {
      const center = centroid(event.features[0]).geometry.coordinates
      //this.highlightParcel(event.features[0].properties.PIN)
      //this.props.history.push(`/${event.features[0].properties.PIN}/`)
      this.setState({
        acres: event.features[0].properties.Acres,
        ownerName: event.features[0].properties.send_to_na,
        ownerAddress1: event.features[0].properties.ownerstree,
        ownerAddress2: event.features[0].properties.ownerCityS,
        PIN: event.features[0].properties.PIN,
        streetAddress: event.features[0].properties.Address,
        zoning: event.features[0].properties.Zoning,
        coords: event.features[0].geometry.coordinates
      });
      //this.fetchData(event.features[0].properties.PIN)
      //this._goToCoords({x:center[0], y:center[1]})
    }
  }

  render() {
    const {viewport, settings, mapStyle} = this.state;
    return (
      <div>
      <MapGL
        {...viewport}
        {...settings}
        mapStyle={mapStyle}
        onViewportChange={this._onViewportChange}
        onClick={this._onClick}
        mapboxApiAccessToken={MAPBOX_TOKEN} >
      </MapGL>
      <ParcelDetails
        streetAddress={this.state.streetAddress}
        acres={this.state.acres}
        ownerName={this.state.ownerName}
        ownerAddress1={this.state.ownerAddress1}
        ownerAddress2={this.state.ownerAddress2}
        PIN={this.state.PIN}
        zoning={this.state.zoning}
        coords={this.state.coords}
      />
      </div>
    );
  }
}

export default App;
