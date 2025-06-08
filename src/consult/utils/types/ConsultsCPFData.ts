import { type CNH } from './CNH';
import { type LegalAnalysisType } from './LegalAnalysis';
import { type PersonLegalProceedingsType } from './PersonLegalProceedings';
import { type PFCredits } from './PFCredits';

export type ConsultsCPFData = {
  formattedIdentification: string;
  lastCNHRequest?: CNH;
  lastCNHRequestLoading?: boolean | null;
  lastConsultPersonRequest?: PFCredits;
  lastConsultPersonRequestLoading?: boolean | null;
  lastPersonLegalproceedings?: PersonLegalProceedingsType;
  lastPersonLegalproceedingsLoading?: boolean | null;
  lastLegalAnalysis?: LegalAnalysisType;
  lastLegalAnalysisLoading?: boolean | null;
};
