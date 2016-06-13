import React, { Component, PropTypes } from 'react';

// Component for a single Ledger
export default class Ledger extends Component {
    render() {
        return (
            <li>{this.props.ledger.text}</li>
        );
    }
}

Ledger.propTypes = {
    ledger: PropTypes.object.isRequired,
};
