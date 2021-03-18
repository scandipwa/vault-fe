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

import { PaymentMethods } from '../../type/VaultPaymentMethods';
import VaultStorage from './VaultStorage.component';

export const VaultDispatcher = import(
    /* webpackMode: "lazy", webpackChunkName: "dispatchers" */
    '../../store/Vault/Vault.dispatcher'
);

/** @namespace VaultGraphql/Component/VaultStorage/Container/mapStateToProps */
export const mapStateToProps = (state) => ({
    storedPaymentMethods: state.VaultReducer.storedPaymentMethods,
    selectedStoredPaymentMethod: state.VaultReducer.public_hash,
    isLoading: state.VaultReducer.isLoading,
    device: state.ConfigReducer.device
});

/** @namespace VaultGraphql/Component/VaultStorage/Container/mapDispatchToProps */
export const mapDispatchToProps = (dispatch) => ({
    getStoredPaymentMethods: () => {
        VaultDispatcher.then(
            ({ default: dispatcher }) => dispatcher.handleData(dispatch)
        );
    }
});

/** @namespace VaultGraphql/Component/VaultStorage/Container/VaultStorageContainer */
export class VaultStorageContainer extends PureComponent {
    static propTypes = {
        selectedStoredPaymentMethod: PropTypes.string,
        storedPaymentMethods: PaymentMethods.isRequired,
        getStoredPaymentMethods: PropTypes.func.isRequired,
        isCheckout: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool,
        paymentMethodVaultCode: PropTypes.string,
        device: DeviceType.isRequired
    };

    static defaultProps = {
        selectedStoredPaymentMethod: null,
        paymentMethodVaultCode: null,
        isLoading: true
    };

    componentDidMount() {
        const { getStoredPaymentMethods } = this.props;
        getStoredPaymentMethods();
    }

    containerProps() {
        const {
            device,
            selectedStoredPaymentMethod,
            isLoading,
            isCheckout
        } = this.props;

        return {
            paymentMethods: this.handleFilterStoredPaymentMethods(),
            device,
            selectedStoredPaymentMethod,
            isLoading,
            isCheckout
        };
    }

    /*
     * Since from VaultGraphQl we are getting all stored paments with provided user token
     * we need to filter them depending on opened payment method tab
    */
    handleFilterStoredPaymentMethods() {
        const {
            isLoading,
            paymentMethodVaultCode,
            storedPaymentMethods: { items }
        } = this.props;

        if (isLoading) {
            return null;
        }

        if (!paymentMethodVaultCode) {
            return items;
        }

        /*
         * Split payment code because from selected payment
         * we are getting code with vault postfix
         * braintree_cc_vault => braintree
        */
        const selectedPaymentCode = paymentMethodVaultCode.split('_')[0];

        const filteredPaymentMethods = items.filter((value) => value.payment_method_code === selectedPaymentCode);

        return filteredPaymentMethods;
    }

    render() {
        return (
            <VaultStorage
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VaultStorageContainer);
