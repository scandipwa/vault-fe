/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/vault-graphql
 * @link https://github.com/scandipwa/vault-graphql
 */

import {
    UPDATE_IS_LOADING,
    UPDATE_SELECTED_PAYMENT_METHOD,
    UPDATE_STORED_PAYMENT_METHODS
} from './Vault.action';

/** @namespace VaultGraphql/Store/Vault/Reducer/getInitialState */
export const getInitialState = () => ({
    storedPaymentMethods: {},
    isLoading: true,
    public_hash: ''
});

/** @namespace VaultGraphql/Store/Vault/Reducer/VaultReducer */
export const VaultReducer = (
    state = getInitialState(),
    action
) => {
    const {
        type,
        status,
        storedPaymentMethods,
        public_hash: selectedPublicHash
    } = action;

    switch (type) {
    case UPDATE_STORED_PAYMENT_METHODS:

        return {
            ...state,
            isLoading: false,
            storedPaymentMethods: { ...storedPaymentMethods }
        };
    case UPDATE_IS_LOADING:

        return {
            ...state,
            isLoading: status
        };
    case UPDATE_SELECTED_PAYMENT_METHOD:

        return {
            ...state,
            public_hash: selectedPublicHash
        };
    default:
        return state;
    }
};

export default VaultReducer;
