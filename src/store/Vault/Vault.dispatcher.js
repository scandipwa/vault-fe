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

import { showNotification } from 'Store/Notification/Notification.action';
import { fetchMutation, QueryDispatcher } from 'Util/Request';

import VaultQuery from '../../query/Vault.query';
import {
    updateSelectedPublicHash,
    updateStoredPaymentMethods,
    updateVaultIsLoading
} from './Vault.action';

/**
 * Vault Dispatcher
 * @class VaultDispatcher
 * @extends VaultDispatcher
 * @namespace VaultGraphql/Store/Vault/Dispatcher/VaultDispatcher */
export class VaultDispatcher extends QueryDispatcher {
    __construct() {
        super.__construct('Vault');
    }

    static deletePaymentMethod(dispatch, options) {
        const { public_hash } = options;
        dispatch(updateVaultIsLoading(true));
        fetchMutation(VaultQuery.getDeleteCardFromVaultMutation(
            public_hash
        )).then(
            /** @namespace VaultGraphql/Store/Vault/Dispatcher/fetchMutation/then */
            ({ deletePaymentToken: { storedPaymentMethods } }) => {
                dispatch(updateStoredPaymentMethods(storedPaymentMethods));
                dispatch(showNotification('success', __('Stored Payment Method was successfully removed!')));
            }
        ).catch(
            /** @namespace VaultGraphql/Store/Vault/Dispatcher/fetchMutation/then/catch */
            (error) => {
                dispatch(updateVaultIsLoading(false));
                dispatch(showNotification('error', error[0].message));
                return null;
            }
        );
    }

    static onSelectPaymentMethod(dispacth, options) {
        dispacth(updateSelectedPublicHash(options));
    }

    onError(error, dispatch) {
        dispatch(updateVaultIsLoading(false));
        dispatch(showNotification('error', 'Error fetching stored payments!', error));
    }

    onSuccess(data, dispatch) {
        const { storedPaymentMethods } = data;
        dispatch(updateStoredPaymentMethods(storedPaymentMethods));
    }

    prepareRequest() {
        return VaultQuery.getQuery();
    }
}

export default new VaultDispatcher();
