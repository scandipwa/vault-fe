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

import { Field } from 'Util/Query';

/** @namespace VaultGraphQl/Query/Vault/Query/VaultQuery */
export class VaultQuery {
    getQuery() {
        return new Field('customerPaymentTokens')
            .addField(this._getVaultStorageItemsField())
            .setAlias('storedPaymentMethods');
    }

    getDeleteCardFromVaultMutation(public_hash) {
        const mutation = new Field('deletePaymentToken')
            .addArgument('public_hash', 'String!', public_hash)
            .addField(this.getQuery());

        return mutation;
    }

    _getVaultStorageItemsField() {
        return new Field('items')
            .addFieldList(this._getVaultStorageItemFields());
    }

    _getVaultStorageItemFields() {
        return [
            'payment_method_code',
            'public_hash',
            'type',
            this._getPaymentDetailsField()
        ];
    }

    _getPaymentDetailsField() {
        return new Field('details')
            .addFieldList(this._getPaymentDetailsFields());
    }

    _getPaymentDetailsFields() {
        return [
            'expirationDate',
            'maskedCC',
            'type'
        ];
    }
}

export default new VaultQuery();
