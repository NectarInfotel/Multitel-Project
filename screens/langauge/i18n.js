import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import po from './po.json';

  
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    po: po,
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;