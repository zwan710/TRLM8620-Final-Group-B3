import { locale, updateLocale } from '../app.js';

var stringsJSON = {};

const i18n = {

    //load resource json based on locale
    loadStringsJSON: async (newLocale) => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const response = await fetch(`./content/${newLocale}/strings.json`, options)
            stringsJSON = await response.json();
        } catch (err) {
            console.log('Error getting strings', err);
            if (newLocale != "en-US") {
                updateLocale("en-US");
            }
        }
    },

    //load resource json based on locale
    getString: (view, key) => {
        return stringsJSON[view][key];
    },

    //determine the proper currency format based on locale and return html string
    formatCurrency: (price, color) => {
        let formatted;
        let converted = convertCurrency(price);
        formatted = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyMap[locale] }).format(converted); //$NON-NLS-L$ 
        //return the formatted currency within template literal
        return `<h4>${formatted}</h4>`


    },
    //return the locale based link to html file within the 'static' folder
    getHTML: () => {
        return `${locale}/terms.html`; //$NON-NLS-L$ 
    },
    //format date accoring to locale
    formatDate: (date) => {
    // locale 是从 app.js 进来的，比如 "en-US" / "zh-CN" / "nl-NL"
    const loc = (locale || 'en-US').toLowerCase();

    // ★ 只要是中文（zh-CN），就不要星期几
    if (loc === 'zh-cn') {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Intl.DateTimeFormat('zh-CN', options).format(date);
    }

    // 其它语言：保留原来的 “weekday + 月/日/年”
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat([locale, 'en-US'], options).format(date); //$NON-NLS-L$
}
}

//used to determine the correct currency symbol
var currencyMap = {
    'en-US': 'USD',
    'zh-CN': 'CNY',
    'nl-NL': 'EUR'
};

//function to perform rough conversion from galactic credits to real currencies
//Disabled for project
var convertCurrency = (price) => {
    return price;
}

export default i18n;