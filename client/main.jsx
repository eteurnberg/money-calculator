import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import LedgerListing from '../imports/ui/LedgerListing.jsx';

Meteor.startup(() => {
    render(<LedgerListing />, document.getElementById('render-target'));
});
