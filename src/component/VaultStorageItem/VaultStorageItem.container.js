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

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { DeviceType } from 'Type/Device';

import { VaultDispatcher } from '../../store/Vault/Vault.dispatcher';
import { PaymentMethod } from '../../type/VaultPaymentMethods';
import VaultStorageItem from './VaultStorageItem.component';

/** @namespace VaultGraphql/Component/VaultStorageItem/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    device: state.ConfigReducer.device
});

/** @namespace VaultGraphql/Component/VaultStorageItem/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    deletePaymentMethod: (options) => VaultDispatcher.deletePaymentMethod(dispatch, options),
    onSelectPaymentMethod: (options) => VaultDispatcher.onSelectPaymentMethod(dispatch, options)
});

/** @namespace VaultGraphql/Component/VaultStorageItem/Container/VaultStorageItemContainer */
export class VaultStorageItemContainer extends PureComponent {
    static propTypes = {
        deletePaymentMethod: PropTypes.func.isRequired,
        onSelectPaymentMethod: PropTypes.func.isRequired,
        paymentMethod: PaymentMethod.isRequired,
        isCheckout: PropTypes.bool.isRequired,
        isSelected: PropTypes.bool.isRequired,
        device: DeviceType.isRequired
    };

    containerFunctions = {
        handleDeleteStoredPaymentMethod: this.handleDeleteStoredPaymentMethod.bind(this),
        handleOnClick: this.handleOnClick.bind(this)
    };

    containerProps() {
        const {
            paymentMethod,
            isCheckout,
            isSelected,
            device
        } = this.props;

        return {
            paymentMethod,
            isCheckout,
            device,
            isSelected
        };
    }

    handleDeleteStoredPaymentMethod() {
        const { paymentMethod: { public_hash }, deletePaymentMethod } = this.props;

        deletePaymentMethod({ public_hash });
    }

    handleOnClick() {
        const { onSelectPaymentMethod, paymentMethod: { public_hash } } = this.props;

        onSelectPaymentMethod(public_hash);
    }

    render() {
        return (
            <VaultStorageItem
              { ...this.containerProps() }
              { ...this.containerFunctions }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VaultStorageItemContainer);
