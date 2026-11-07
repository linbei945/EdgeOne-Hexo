import { createI18n, useI18n } from 'vue-i18n';
import { getLanguage } from '../utils/utils';
import ZH from './zh-CN';
import EN from './en-US';

// Register i8n instance and introduce language files
const i18n = createI18n({
  legacy: false,
  locale: getLanguage() || 'en-US',
  messages: {
    'zh-CN': ZH,
    'en-US': EN,
  },
});

export default i18n;

export { useI18n };
