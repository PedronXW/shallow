export type PersonLegalProceedingsType = {
  totalLegalActions: number;
  totalLegalActionsByPlaintiff: number;
  totalLegalActionsByDefendant: number;
  totalLegalActionsByOther: number;
  firstLegalActionDate: string;
  lastLegalActionDate: string;
  legalActionsLast30Days: number;
  legalActionsLast90Days: number;
  legalActionsLast180Days: number;
  legalActionsLast365Days: number;
  firstInstanceLegalActions: number;
  secondInstanceLegalActions: number;
  thirdInstanceLegalActions: number;
  legalActionsUnderSecrecy: number;
  legalActions: {
    caseNumber: string;
    type: string;
    mainSubject: string;
    courtName: string;
    instanceNumber: string;
    courtType: string;
    districtCourt: string | null;
    judge: string | null;
    rulingBody: string;
    state: string;
    status: string;
    relatedCases: string[];
    inferredSubjectName: string | null;
    inferredSubjectNumber: string | null;
    additionalSubjects: string[];
    volumesCount: string;
    pagesCount: string;
    value: string;
    resJudicataDate: string;
    closureDate: string;
    redistributionDate: string;
    publicationDate: string;
    noticeDate: string;
    lastMovementDate: string;
    captureDate: string;
    numberParts: string;
    legalProcessAge: string;
    hiddenDataReason: string;
    updateCount: string;
    averageMonthlyUpdates: string;
    lastUpdate: string;
    involved: {
      name: string;
      document: string | null;
      activePart: boolean;
      role: string;
      polarity: string;
      lastCaptureDate: string;
      detailsInvolved: {
        specificType: string;
        state: string;
        oab: string;
      };
    }[];
    updates: {
      content: string;
      publicationDate: string;
      captureDate: string;
    }[];
    petitions: {
      type: string;
      author: string | null;
      creationDate: string;
      entryDate: string;
    }[];
    decisions: {
      content: string;
      decisionDate: string;
    }[];
  }[];
};
