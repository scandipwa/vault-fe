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

import PropTypes from 'prop-types';

export const PaymentMethodType = PropTypes.oneOf(['card', 'account']);

export const PaymentMethodDetails = PropTypes.shape({
    type: PropTypes.string,
    maskedCC: PropTypes.string,
    expirationDate: PropTypes.string
});

export const PaymentMethod = PropTypes.shape({
    public_hash: PropTypes.string,
    payment_method_code: PropTypes.string,
    type: PaymentMethodType,
    details: PaymentMethodDetails
});

export const PaymentMethods = PropTypes.shape({
    items: PropTypes.arrayOf(PaymentMethod)
});
