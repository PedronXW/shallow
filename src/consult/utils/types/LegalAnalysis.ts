type ProcessoInfo = {
  total: number;
  totalValue: string;
};

export type LegalAnalysisType = {
  status: string;
  name: string;
  personType: string;
  document: string;
  totalCases: number;
  totalValue: string;
  executionCases: ProcessoInfo;
  criminalCases: ProcessoInfo;
  laborCases: ProcessoInfo;
  litigationCases: ProcessoInfo;
  activeCases: number;
  inactiveCases: number;
  casesAsPlaintiff: number;
  casesAsDefendant: number;
  casesAsRelated: number;
};
