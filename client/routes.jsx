import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from '../imports/layouts/MainLayout.jsx';
import LedgerListing from '../imports/ui/LedgerListing.jsx';

FlowRouter.route('/Ledgers', {
    action() {
        mount(MainLayout, {
            content: (<LedgerListing />),
        });
    }
});