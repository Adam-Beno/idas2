import { IntlProvider } from 'react-intl';

let instance = null;

class Intl {
  constructor() {
    if (!instance) {
      instance = this;
      this.locale = 'en';
      this.provider = IntlProvider;
    }
    return instance;
  }

  getProvider() {
    return this.provider;
  }

  getIntl() {
    const provider = new IntlProvider({ locale: this.locale }, {});
    const { intl } = provider.getChildContext();
    return intl;
  }

  getLocale() {
    return this.locale;
  }
}

export default Intl;
