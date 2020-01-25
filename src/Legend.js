import React from 'react';

class Legend extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div id="map-legend">
                <h3>Zoning Legend</h3>
                <ul>
                    <li><span id="medium-density-residential" className="zoningColor"></span>Medium Density Residential</li>
                    <li><span id="central-business-district" className="zoningColor"></span>Central Business District</li>
                    <li><span id="non-conforming" className="zoningColor"></span>Non-Conforming</li>
                    <li><span id="high-density-residential" className="zoningColor"></span>High Density Residential</li>
                    <li><span id="historic-downtown" className="zoningColor"></span>Historic Downtown</li>
                    <li><span id="parks-and-public-services" className="zoningColor"></span>Parks and Public Spaces</li>
                </ul>
                <ul>
                    <li><span id="parking" className="zoningColor"></span>Parking</li>
                    <li><span id="industrial" className="zoningColor"></span>Industrial</li>
                    <li><span id="local-commercial" className="zoningColor"></span>Local Commercial</li>
                    <li><span id="local-commercial-medium-density-residential" className="zoningColor"></span>Local Commercial - Medium Density Residential</li>
                    <li><span id="local-commercial-industrial" className="zoningColor"></span>Local Commercial - Industrial</li>
                </ul>
            </div>
        )
    }

}

export default Legend;