import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { createContainer } from 'meteor/react-meteor-data';

import { Ledgers } from '../api/ledgers.js';

import Ledger from './Ledger.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// LedgerListing component, represents the listing of ledgers
class LedgerListing extends Component {

    handleSubmit(event) {
        event.preventDefault();

        // Find the correct text field via react ref
        const title = ReactDOM.findDOMNode(this.refs.newLedgerTextInput).value.trim();

        Meteor.call('ledgers.insert', title);

        // Clear the form
        ReactDOM.findDOMNode(this.refs.newLedgerTextInput).value = '';
    }

    renderLedgers() {
        return this.props.ledgers.map((ledger) => (
            <Ledger key={ledger._id} ledger={ledger} />
        ));
    }

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Ledgers</h1>

                    <AccountsUIWrapper />

                    { this.props.currentUser ?
                        <form className="new-ledger" onSubmit={this.handleSubmit.bind(this)} >
                            <input
                                type="text"
                                ref="newLedgerTextInput"
                                placeholder="Type to add new ledgers"
                            />
                        </form> : ''
                    }
                </header>

                <ul>
                    {this.renderLedgers()}
                </ul>
            </div>
        );
    }
}

LedgerListing.propTypes = {
    ledgers: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('ledgers');

    return {
        ledgers: Ledgers.find({}, { sort: { createdAt: -1 } }).fetch(),
        currentUser: Meteor.user(),
    };
}, LedgerListing);
