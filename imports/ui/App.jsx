import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';

import { Ledgers } from '../api/ledgers.js';
import Ledger from './Ledger.jsx';

// App component, represents the whole app
class App extends Component {

    handleSubmit(event) {
        event.preventDefault();

        // Find the correct text field via react ref
        const text = ReactDOM.findDOMNode(this.refs.newLedgerTextInput).value.trim();

        Ledgers.insert({
            text,
            createdAt: new Date(),
        });

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

                    <form className="new-ledger" onSubmit={this.handleSubmit.bind(this)} >
                        <input
                            type="text"
                            ref="newLedgerTextInput"
                            placeholder="Type to add new ledgers"
                        />
                    </form>
                </header>

                <ul>
                    {this.renderLedgers()}
                </ul>
            </div>
        );
    }
}

App.propTypes = {
    ledgers: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        ledgers: Ledgers.find({}, { sort: { createdAt: -1 } }).fetch(),
    };
}, App);
