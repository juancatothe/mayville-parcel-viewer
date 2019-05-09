import React from 'react';
import mapboxgl from 'mapbox-gl';
import Mayville from './js/mayvillevillage.geojson';

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
      map.on('load', function() {
        map.addSource('parcels', {
            type: 'geojson',
            data: Mayville
        });
        map.addLayer({
            "id": "parcel-fill",
            "type": "fill",
            "source": "parcels",
            "layout": {},
            "paint": {
                "fill-color": "#643265",
                "fill-opacity": 0.75
            }
        });
        map.addLayer({
            "id": "parcel-line",
            "type": "line",
            "source": "parcels",
            "layout": {},
            "paint": {
                "line-color": "#5f0b60",
            }
        });
        console.log('loading');
      });
      map.on('click', function(e) {
        const parcelFeatures = null;
        try{
          parcelFeatures = map.queryRenderedFeatures(e.point, { layers: ['parcels'] });
        }catch (error) {
          //console.log(error);
          alert('error');
      } finally {
        console.log(e);
      }
      });
    }
  
    render() {
      const { lng, lat, zoom } = this.state;
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