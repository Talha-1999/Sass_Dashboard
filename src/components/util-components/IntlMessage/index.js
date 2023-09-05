import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";

const IntlMessage = props => <FormattedMessage {...props} />;
console.log(IntlMessage)
export default injectIntl(IntlMessage, {
  withRef: false
});
