import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

import { Ledgers } from '../api/ledgers.js';

// Component for a single Ledger
export default class Ledger extends Component {
    deleteThisLedger() {
        Meteor.call('ledgers.remove', this.props.ledger._id);
    }

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
