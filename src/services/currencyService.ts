
// Сервис для получения курсов валют от ЦБ РФ
export interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  change: number;
  previous: number;
}

// Маппинг кодов валют ЦБ РФ на наши коды
const CURRENCY_MAPPING = {
  'USD': 'R01235',
  'EUR': 'R01239', 
  'GBP': 'R01035',
  'JPY': 'R01820',
  'CNY': 'R01375',
  'CHF': 'R01775'
};

export class CurrencyService {
  private static instance: CurrencyService;
  private cachedRates: CurrencyRate[] = [];
  private lastUpdate: Date | null = null;

  static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService();
    }
    return CurrencyService.instance;
  }

  async fetchRatesFromCBR(): Promise<CurrencyRate[]> {
    try {
      // Получаем текущие данные от ЦБ РФ
      const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
      const data = await response.json();

      const rates: CurrencyRate[] = [];

      // Обрабатываем валюты согласно маппингу
      for (const [code, cbrCode] of Object.entries(CURRENCY_MAPPING)) {
        const currencyData = data.Valute[cbrCode];
        
        if (currencyData) {
          const currentRate = currencyData.Value;
          const previousRate = currencyData.Previous;
          const change = currentRate - previousRate;

          rates.push({
            code,
            name: this.getCurrencyName(code),
            rate: Number(currentRate.toFixed(4)),
            change: Number(change.toFixed(4)),
            previous: Number(previousRate.toFixed(4))
          });
        }
      }

      // Если получили данные, кешируем их
      if (rates.length > 0) {
        this.cachedRates = rates;
        this.lastUpdate = new Date();
        console.log('Курсы валют успешно загружены:', rates);
        return rates;
      } else {
        throw new Error('Нет данных о валютах');
      }
    } catch (error) {
      console.error('Ошибка получения курсов валют:', error);
      // Возвращаем кешированные данные или дефолтные значения
      return this.cachedRates.length > 0 ? this.cachedRates : this.getDefaultRates();
    }
  }

  private getCurrencyName(code: string): string {
    const names: { [key: string]: string } = {
      'USD': 'Доллар США',
      'EUR': 'Евро',
      'GBP': 'Фунт стерлингов',
      'JPY': 'Японская иена',
      'CNY': 'Китайский юань',
      'CHF': 'Швейцарский франк'
    };
    return names[code] || code;
  }

  private getDefaultRates(): CurrencyRate[] {
    console.log('Используются дефолтные курсы валют');
    return [
      { code: "USD", name: "Доллар США", rate: 78.8549, change: -0.2736, previous: 79.1285 },
      { code: "EUR", name: "Евро", rate: 89.9267, change: -0.4503, previous: 90.377 },
      { code: "GBP", name: "Фунт стерлингов", rate: 106.872, change: 0.191, previous: 106.681 },
      { code: "JPY", name: "Японская иена", rate: 0.5221, change: -0.0013, previous: 0.5234 },
      { code: "CNY", name: "Китайский юань", rate: 10.9128, change: -0.0324, previous: 10.9452 },
      { code: "CHF", name: "Швейцарский франк", rate: 96.3172, change: -0.4406, previous: 96.7578 },
    ];
  }

  async getCurrentRates(): Promise<CurrencyRate[]> {
    // Если данные свежие (менее 10 минут), возвращаем кешированные
    if (this.lastUpdate && (Date.now() - this.lastUpdate.getTime()) < 10 * 60 * 1000) {
      console.log('Используются кешированные курсы валют');
      return this.cachedRates;
    }

    console.log('Загружаем свежие курсы валют');
    return await this.fetchRatesFromCBR();
  }
}
