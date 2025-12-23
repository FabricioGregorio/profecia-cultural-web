import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  if (!locale || !['en', 'pt', 'es'].includes(locale)) {
    locale = 'pt';
  }
 
  return {
    locale,
    messages: (await import(`../app/dictionaries/${locale}.json`)).default
  };
});
