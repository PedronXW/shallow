import { type PFCredits } from './PFCredits';

export type ConsultsCNPJData = {
  lastConsultPersonRequest?: PFCredits;
  lastConsultPersonRequestLoading?: boolean | null;
  formattedIdentification: string;
  document?: string;
};
