import React from 'react';
import StreetView from './StreetView';

class ParcelDetails extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div id="parcel-details">
                <div id="logo-container">
                    <div id="logo">
                        <img src="mayville_sunflower.png" alt="Mayville Sunflower"/>
                        <h2>Mayville Parcel Map</h2>
                    </div>
                </div>
                <p><span>Street Address:</span> {this.props.streetAddress}</p>
                <p><span>Owner:</span> {this.props.ownerName}</p>
                <p><span>Owner Street:</span> {this.props.ownerAddress1}</p>
                <p><span>Owner City:</span> {this.props.ownerAddress2}</p>
                <p><span>Acres:</span> {this.props.acres}</p>
                <p><span>Parcel ID:</span> {this.props.PIN}</p>
                <p><span>Zoning:</span> {this.props.zoning}<span data-zoning={this.props.zoning}></span></p>
                {this.props.coords && <StreetView coords={this.props.coords}></StreetView>}
            </div>
        )
    }

}

export default ParcelDetails;