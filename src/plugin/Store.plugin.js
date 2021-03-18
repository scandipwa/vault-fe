/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import { VaultReducer } from '../store/Vault/Vault.reducer';

export const getStaticReducers = (args, callback) => ({
    ...callback(...args),
    VaultReducer
});

export default {
    'Store/Index/getReducers': {
        function: getStaticReducers
    }
};
