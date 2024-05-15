const messages = {
    en: {
        welcome: 'Currency Converter',
        currency: 'Currency',
        saveHistory: 'Save to history',
        history: 'Conversion History'
    },
    ru: {
        welcome: 'Конвертер валют',
        currency: 'Валюта',
        saveHistory: 'Сохранить историю',
        history: 'История конверсий'
    }
};

const i18n = new VueI18n({
    locale: 'ru',
    messages,
});

new Vue({
    el: '#app',
    i18n,
    data() {
        return {
            amount: 1,
            fromCurrency: 'USD',
            toCurrency: 'EUR',
            rates: {},
            history: []
        };
    },
    computed: {
        convertedAmount() {
            return (this.amount * this.rates[this.toCurrency] / this.rates[this.fromCurrency]).toFixed(2);
        }
    },
    methods: {
        async fetchRates() {
            try {
                const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
                const data = await response.json();
                this.rates = data.rates;
            } catch (error) {
                console.error('Error fetching rates:', error);
            }
        },
        convertCurrency() {
            const result = this.convertedAmount;
            this.history.push({
                from: this.fromCurrency,
                to: this.toCurrency,
                amount: this.amount,
                result: result,
                date: new Date().toLocaleString()
            });

            console.log(this.history);
        },
        swapCurrencies() {
            const temp = this.fromCurrency;
            this.fromCurrency = this.toCurrency;
            this.toCurrency = temp;
        }
    },
    mounted() {
        this.fetchRates();
    }
});
