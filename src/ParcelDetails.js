import React from 'react';

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
                <p>Zoning: {this.props.Zoning}</p>
            </div>
        )
    }

}

export default ParcelDetails;