import React from 'react';

class ParcelDetails extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div id="parcel-details">
                <h1>Village of Mayville</h1>
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