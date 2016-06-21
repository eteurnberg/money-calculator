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
            <a href="#" className="list-group-item">
                <span className="ledgerText">
                    {this.props.ledger.title}
                </span>

                <button type="button" className="delete close pull-right" aria-label="Close" onClick={this.deleteThisLedger.bind(this)}>
                    <span aria-hidden="true">
                        &times;
                    </span>
                </button>
            </a>
        );
    }
}

Ledger.propTypes = {
    ledger: PropTypes.object.isRequired,
};
