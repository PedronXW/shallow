export type FipeType = {
  fipeChassi?: {
    chassi: string;
    treatedChassi: string;
    origin: string;
    region: string;
    country: string;
    category: string;
    brand: string;
    model: string;
    version: string;
    year: number;
    bodyworkType: string;
    engine: string;
    fuel: string;
    fabricationPlace: string;
    priceHistory: PriceHistoryType[];
    pricerII: {
      code: string;
      brand: string;
      model: string;
      fuel: string;
      version: string;
      value: string;
    }[];
  };
  fipePlate?: {
    chassi: string;
    treatedChassi: string;
    origin: string;
    region: string;
    country: string;
    category: string;
    brand: string;
    model: string;
    version: string;
    year: number;
    bodyworkType: string;
    engine: string;
    fuel: string;
    fabricationPlace: string;
    priceHistory: PriceHistoryType[];
    pricerII: {
      code: string;
      brand: string;
      model: string;
      fuel: string;
      version: string;
      value: string;
    }[];
  };
}

export type PriceHistoryType ={
  code: string;
  value: number;
  brand: string;
  model: string;
  fuel: string;
  monthReference: string;
  valueReference: number;
  twelveMonthsHistory: {
    id: number;
    yearMonth: string;
    value: string;
  }[];
}