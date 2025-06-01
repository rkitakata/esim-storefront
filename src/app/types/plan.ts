export interface Plan {
  id: number;
  name: string;
  planId: string;
  price: number;
  dataId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  validityDays: number;
  dataVolume: string;
  dataUnit: string;
  validityDaysCycle: string;
  networkId: number;
  enabled: boolean;
  packageType: 'PER_DAY' | 'FIXED_DAY';
  countryId: number;
  serviceProviderId: number;
  prices: Record<string, number>;
  defaultCurrency: string;
  topupEnabled: boolean;
  network: {
    id: number;
    name: string;
    enabled: boolean;
    code: string;
    apn: string;
    qos: string;
    type: 'LOCAL' | 'ROAMING';
    networkGeneration: string;
    countryId: number;
    createdAt: string;
    updatedAt: string;
  };
  country: {
    name: string;
    enabled: boolean;
    subCountries: null;
    code: string;
  };
  serviceProvider: {
    name: string;
    enabled: boolean;
  };
  plans_prices: Record<string, unknown> | null;
  provision_price: Record<string, unknown> | null;
  xe: {
    [currency: string]: number;
  };
}

export interface ApiResponse {
  statusCode: number;
  data: {
    network: Array<unknown>;
    country: {
      name: string;
      enabled: boolean;
      subCountries: null;
      code: string;
    };
    plans: {
      PER_DAY: Plan[];
      FIXED_DAY: Plan[];
    };
  };
}
