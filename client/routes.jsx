import React from 'react';
import { mount } from 'react-mounter';

import { MainLayout } from '../imports/layouts/MainLayout.jsx';
import LedgerListing from '../imports/ui/LedgerListing.jsx';
import LedgerDetail from '../imports/ui/LedgerDetail.jsx';

FlowRouter.route('/your-ledgers', {
    action() {
        mount(MainLayout, {
            content: (<LedgerListing />),
        });
    }
});

FlowRouter.route('/ledger/:ledgerId', {
    name: 'Ledger.show',
    action: function(params, queryParams) {
        mount(MainLayout, {
            content: (<LedgerDetail ledgerId={params.ledgerId} />),
        });
    }
});
