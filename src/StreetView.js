import React, { useState, useEffect, useContext } from "react";
import * as Mapillary from "mapillary-js";
import bearing from "@turf/bearing";
import { connect } from "net";

let clientid = "dkhrbnBqUXhCMm9lOUlOdHI3akc3dzpjMzYxYWJiNDZjNjAyOTM4";

/**
 * Wrap a value on the interval [min, max].
 */
function wrap(value, min, max) {
  var interval = max - min;

  while (value > max || value < min) {
    if (value > max) {
      value = value - interval;
    } else if (value < min) {
      value = value + interval;
    }
  }

  return value;
}

/**
 * Convert a desired bearing to a basic X image coordinate for
 * a specific node bearing.
 *
 * Works only for a full 360 panorama.
 */
function bearingToBasic(desiredBearing, nodeBearing) {
  // 1. Take difference of desired bearing and node bearing in degrees.
  // 2. Scale to basic coordinates.
  // 3. Add 0.5 because node bearing corresponds to the center
  //    of the image. See
  //    https://mapillary.github.io/mapillary-js/classes/viewer.html
  //    for explanation of the basic coordinate system of an image.
  var basic = (desiredBearing - nodeBearing) / 360 + 0.5;

  // Wrap to a valid basic coordinate (on the [0, 1] interval).
  // Needed when difference between desired bearing and node
  // bearing is more than 180 degrees.
  return wrap(basic, 0, 1);
}

/**
 * Function to set the mapillary viewer's center by computing bearing
 */
function setBearing(node, mly, start, end) {
  if (!node.fullPano) {
    // We are only interested in setting the bearing for full 360 panoramas.
    return;
  }
  var nodeBearing = node.computedCA; // Computed node compass angle (equivalent
  // to bearing) is used by mjs when placing
  // the node in 3D space.

  // compute this with @turf/bearing
  var desiredBearing = bearing(start, end); // Your desired bearing.

  var basicX = bearingToBasic(desiredBearing, nodeBearing);
  var basicY = 0.6; // tilt slight down

  var center = [basicX, basicY];

  mly.setCenter(center);
}

/**
 * Promise-returning function to fetch a new Mapillary imageKey based on some coordinates
 */
const fetchImageKey = coords => {
  let lnglat = `${coords[0][0][0]},${coords[0][0][1]}`;
  console.log(lnglat)
  let url = `https://a.mapillary.com/v3/images?client_id=${clientid}&closeto=${lnglat}&usernames=juancatothe`;
  console.log(url)
  return fetch(url).then(r => r.json());
};

let markerStyle = {
  ballColor: "white",
  ballOpacity: 0.5,
  color: "yellow",
  opacity: 0.55,
  interactive: false,
  radius: 2
};

const StreetView = ({ coords }) => {
  let mapillaryView
  // local state to store the mapillary viewer
  const [mapillary, setMapillary] = useState(null)
  
  // initial useEffect: spin up a viewer
  useEffect(() => {
    console.log(coords)
    fetchImageKey(coords)
      .then(d => {
        coords.lng = coords[0][0][0]
        coords.lat = coords[0][0][1]
        // make a new mapillary viewer
        let mapillaryView = new Mapillary.Viewer("mly", clientid, null, {
          component: {
            cover: false,
            marker: true
          }
        });
        // tell it to go to the image we we just got back from fetchImageKey
        console.log(d)
        mapillaryView.moveToKey(d.features[0].properties.key).then(node => {
          setBearing(node, mapillaryView, d.features[0].geometry.coordinates, [
            coords.lng,
            coords.lat
          ]);
        });
        setMapillary(mapillaryView)
      })
  }, [])

  // when coords changes, fetch new image key based on coords
  useEffect(() => {
    if (mapillary) {
      fetchImageKey(coords).then(d => {
        mapillary.moveToKey(d.features[0].properties.key).then(node => {
          setBearing(node, mapillary, d.features[0].geometry.coordinates, [
            coords.lng,
            coords.lat
          ]);
        });
      })

      let defaultMarker = new Mapillary.MarkerComponent.SimpleMarker(
        "default-id",
        { lat: coords.lat, lon: coords.lng },
        markerStyle
      );
      let markerComponent = mapillary.getComponent("marker");
      markerComponent.add([defaultMarker]);
    }

    // mapillaryView = new Mapillary.Viewer("mly", clientid, null, {
    //   component: {
    //     cover: false,
    //     marker: true
    //   }
    // });

    // mapillaryView.moveToKey(d.features[0].properties.key).then(node => {
    //   setBearing(node, mapillaryView, d.features[0].geometry.coordinates, [
    //     coords[0][0][0],
    //     coords[0][0][1]
    //   ]);
    // });
  }, [coords])

  return (
    <div id="mly"></div>
  )
}

export default StreetView;