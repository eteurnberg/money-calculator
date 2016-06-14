import React, { Component, PropTypes } from 'react';

import { Ledgers } from '../api/ledgers.js';

// Component for a single Ledger
export default class Ledger extends Component {
    render() {
        return (
            <li>
                <button className="delete" onClick={this.deleteThisLedger.bind(this)}>
                    &times;
                </button>
                <span className="ledgerText">
                    <strong>{this.props.ledger.username}</strong>: {this.props.ledger.title}
                </span>
            </li>
        );
    }
}

Ledger.propTypes = {
    ledger: PropTypes.object.isRequired,
};
