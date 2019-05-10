import React, { Component } from 'react';

import MapGL, { FlyToInterpolator } from 'react-map-gl';

import centroid from '@turf/centroid';

import './App.css';
import Map from './Map';

const MAPBOX_TOKEN = 'pk.eyJ1IjoianVhbmNhdG90aGUiLCJhIjoiY2p1MW9lYzdrMDN1MTN5cGVyYXVhMGw3NSJ9.8m02a0ot4-sQBBz7OfU0ng';

class App extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      viewport: {
        latitude: 43.334172,
        longitude: -83.346728,
        zoom: 13,
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
      mapStyle: 'mapbox://styles/juancatothe/cju1ofshw1hgk1flke5q8xja6',
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
        selectedParcel: event.features[0].properties.PIN,
      })
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
      </div>
    );
  }
}

export default App;
