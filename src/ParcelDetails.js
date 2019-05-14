import React from 'react';

class ParcelDetails extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div id="parcel-details">
                <h2>Parcel Details</h2>
                <p>{this.props.ownerName}</p>
                <p>{this.props.ownerAddress1}</p>
                <p>{this.props.ownerAddress2}</p>
                <p>{this.props.acres}</p>
                <p>{this.props.PIN}</p>
            </div>
        )
    }

}

export default ParcelDetails;