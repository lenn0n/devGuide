### Internationalization (i18next)
i18next is an internationalization-framework written in and for JavaScript. 

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Installation
    npm install i18next i18next-browser-languagedetector i18next-http-backend

###  ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Create config and import this file in the main.js

    import i18n from "i18next";
    import {initReactI18next} from "react-i18next";
    import LanguageDetector from "i18next-browser-languagedetector";
    import Backend from "i18next-http-backend";
    
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .use(Backend)
      .init({
        debug: true,
        // lng: 'en', // dont set if using language detector
        fallbackLng: "en",
        returnObjects: true,
        interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },
        backend: {
          loadPath: '/locales/{{lng}}/{{ns}}.json',
          requestOptions: {
            cache: 'no-store',
        },
        }  
      });
    
    export default i18n;

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Create *locales* folder and file in your public directory
📁 public
  ➡️ 📂 locales
   ➡️  📂 en
      ➡️ 🗄️ translation/common.json

      
  Sample Content:
    
    {  greeting: "Hello World! {{ code }} <1>Some Custom JSX {{ custom }}</1> :)" }

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Basic Usage

    import { useTranslation, Trans } from 'react-i18next'
    ...
    const { t } = useTranslation(['translation', 'common']);
    ...
    
    // Simple use and If you are using namespace
    { t("greeting", { ns: 'common', code: "CODE_VALUE" }) }

    // If you are using custom render, you pass the code as values
    <Trans
      i18nKey={t("greeting")}
      values={{ 
          code: 'CODE_VALUE', 
          custom: 'CUSTOM_JSX_SAMPLE'
      }}
      components={{
        1: <div className="text-cyan-300 transition-all hover:text-yellow-500 " />
      }}
    />

### Expected Output
`Hello World! CODE_VALUE Some Custom JSX CUSTOM_JSX_VALUE`

### ![#c5f015](https://placehold.co/15x15/c5f015/c5f015.png) Update Translation
     i18n.changeLanguage(code)
