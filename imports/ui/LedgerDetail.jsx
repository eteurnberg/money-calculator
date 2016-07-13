import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Ledgers } from '../api/ledgers.js';

// LedgerDetail component, represents a detailed view of a single ledger, including options to edit it and for calculating final debts

class LedgerDetail extends Component {
    componentWillReceiveProps(nextProps) {
        this.setState({
            currentLedger: nextProps.ledger
        });
    }

    render() {
        return (
            <div>
                {console.log(this.props.ledger)}
                {this.props.ledger._id}
            </div>
        );
    }
}

LedgerDetail.propTypes = {
    ledger: PropTypes.object.isRequired,
};

export default createContainer((params) => {
    Meteor.subscribe('ledgers');

    return {
        ledger: Ledgers.findOne( { _id: params.ledgerId } ),
        currentUser: Meteor.user(),
    };
}, LedgerDetail);
