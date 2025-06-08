export type PFCredits = {
  simplifiedData: SimplifiedBoaVistaPFData;
};

type BoaVistaPFData = {
  email: Datapoint<string>;
  uf: Datapoint<string>;
  name: Datapoint<string>;
  phone: Datapoint<string>;
  debt: Datapoint<string>;
  rentalCompanyQueryName: Datapoint<string>;
  protest: Datapoint<string>;
  addressAmountBureau: Datapoint<string>;
  phonesAmountBureau: Datapoint<string>;
  birthDate: Datapoint<string>;
  debtQuantity: Datapoint<string>;
  debtValue: Datapoint<string>;
  restriction: Datapoint<string>;
  queryAmount: Datapoint<string>;
};

type BoaVistaPJData = {
  creditObtained: Datapoint<string>;
  titlesAmount: Datapoint<string>;
  delay: Datapoint<string>;
  presumedIncome: Datapoint<string>;
  creditLimit: Datapoint<string>;
  creditCommitment: Datapoint<string>;
  highestCredit: Datapoint<string>;
  lastPurchase: Datapoint<string>;
  highestInvoice: Datapoint<string>;
  ownership: Datapoint<string>;
  partnersOwnershipBouncedChecks: Datapoint<string>;
  partnersOwnershipDebts: Datapoint<string>;
  partnersOwnershipBankrupcy: Datapoint<string>;
  partnersOwnershipQueries: Datapoint<string>;
  partnersOwnershipAmount: Datapoint<string>;
  partnersBouncedChecks: Datapoint<string>;
  partnersDebts: Datapoint<string>;
  partnersBankrupcy: Datapoint<string>;
  partnersQueries: Datapoint<string>;
  taxRegimeAmount: Datapoint<string>;
  nameAmount: Datapoint<string>;
  socialReason: Datapoint<string>;
  taxRegime: Datapoint<string>;
  socialCapital: Datapoint<string>;
  mainCnae: Datapoint<string>;
};

export type SimplifiedBoaVistaPFData = {
  boaVistaPFData?: BoaVistaPFData;
  boaVistaPJData?: BoaVistaPJData;
};
export type Datapoint<T = unknown> = {
  entries: {
    queryTimestamp: Date;
    dataTimestamp?: Date;
    value: T;
    source: string;
  }[];
};
