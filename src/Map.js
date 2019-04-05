import React from 'react';
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmNhdG90aGUiLCJhIjoiY2p1MW9lYzdrMDN1MTN5cGVyYXVhMGw3NSJ9.8m02a0ot4-sQBBz7OfU0ng';


class Map extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        lat: 43.334172,
        lng: -83.346728,
        zoom: 13
      };
    }
  
    componentDidMount() {
      const { lng, lat, zoom } = this.state;
  
      const map = new mapboxgl.Map({
        container: this.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [lng, lat],
        zoom
      });
          
       map.on('move', () => {
        const { lng, lat } = map.getCenter();
  
        this.setState({
          lng: lng.toFixed(4),
          lat: lat.toFixed(4),
          zoom: map.getZoom().toFixed(2)
        });
      });
    }
  
    render() {
      const { lng, lat, zoom } = this.state;
      console.log(lng);
      console.log(lat);
      console.log(zoom);
      return (
        <div>
          <div style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            width: '100%'
        }} ref={el => this.mapContainer = el} />
        </div>
      );
    }
  }

export default Map;