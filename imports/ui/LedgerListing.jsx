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
                <div className="page-header">
                    <h1>Your Ledgers</h1>
                </div>

                <AccountsUIWrapper />

                { this.props.currentUser ?
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Create a new ledger</h3>
                        </div>
                        <div className="panel-body">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    onSubmit={this.handleSubmit.bind(this)}
                                    ref="newLedgerTextInput"
                                    placeholder="Title"
                                />
                                <span className="input-group-btn">
                                    <button className="btn btn-default"
                                        type="button"
                                        onClick={this.handleSubmit.bind(this)}
                                    >Create</button>
                                </span>
                            </div>
                        </div>
                    </div> : ''
                }

                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Your saved ledgers</h3>
                    </div>

                    <div className="panel-body">
                        <div className="list-group">
                            {this.renderLedgers()}
                        </div>
                    </div>
                </div>        
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
