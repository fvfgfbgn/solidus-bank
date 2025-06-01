
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
      // Получаем данные за сегодня и вчера для расчета изменений
      const today = new Date().toISOString().split('T')[0].replace(/-/g, '/');
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0].replace(/-/g, '/');
      
      const [todayResponse, yesterdayResponse] = await Promise.all([
        fetch(`https://www.cbr-xml-daily.ru/archive/${today}/daily_json.js`),
        fetch(`https://www.cbr-xml-daily.ru/archive/${yesterday}/daily_json.js`)
      ]);

      const todayData = await todayResponse.json();
      const yesterdayData = await yesterdayResponse.json();

      const rates: CurrencyRate[] = [];

      for (const [code, cbrCode] of Object.entries(CURRENCY_MAPPING)) {
        const todayRate = todayData.Valute[cbrCode];
        const yesterdayRate = yesterdayData.Valute[cbrCode];

        if (todayRate && yesterdayRate) {
          const currentRate = todayRate.Value;
          const previousRate = yesterdayRate.Value;
          const change = currentRate - previousRate;

          rates.push({
            code,
            name: this.getCurrencyName(code),
            rate: Number(currentRate.toFixed(2)),
            change: Number(change.toFixed(2)),
            previous: Number(previousRate.toFixed(2))
          });
        }
      }

      this.cachedRates = rates;
      this.lastUpdate = new Date();
      
      return rates;
    } catch (error) {
      console.error('Ошибка получения курсов валют:', error);
      // Возвращаем кешированные данные или базовые значения
      return this.cachedRates.length > 0 ? this.cachedRates : this.getDefaultRates();
    }
  }

  private getCurrencyName(code: string): string {
    const names = {
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
    return [
      { code: "USD", name: "Доллар США", rate: 89.74, change: -0.34, previous: 90.08 },
      { code: "EUR", name: "Евро", rate: 97.63, change: -0.24, previous: 97.87 },
      { code: "GBP", name: "Фунт стерлингов", rate: 114.15, change: 0.46, previous: 113.69 },
      { code: "JPY", name: "Японская иена", rate: 0.58, change: -0.01, previous: 0.59 },
      { code: "CNY", name: "Китайский юань", rate: 12.76, change: 0.05, previous: 12.71 },
      { code: "CHF", name: "Швейцарский франк", rate: 102.36, change: -0.18, previous: 102.54 },
    ];
  }

  async getCurrentRates(): Promise<CurrencyRate[]> {
    // Если данные свежие (менее 10 минут), возвращаем кешированные
    if (this.lastUpdate && (Date.now() - this.lastUpdate.getTime()) < 10 * 60 * 1000) {
      return this.cachedRates;
    }

    return await this.fetchRatesFromCBR();
  }
}
