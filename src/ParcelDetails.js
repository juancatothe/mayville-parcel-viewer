import React from 'react';
import StreetView from './StreetView';

class ParcelDetails extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div id="parcel-details">
                <p>Street Address: {this.props.streetAddress}</p>
                <p>Owner: {this.props.ownerName}</p>
                <p>Owner Street: {this.props.ownerAddress1}</p>
                <p>Owner City: {this.props.ownerAddress2}</p>
                <p>Acres: {this.props.acres}</p>
                <p>Parcel ID: {this.props.PIN}</p>
                <p>Zoning: {this.props.zoning}</p>
                {this.props.coords && <StreetView coords={this.props.coords}></StreetView>}
            </div>
        )
    }

}

export default ParcelDetails;