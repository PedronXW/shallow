export type RobberyOrTheft = {
  carDetails?: {
    plate: string;
    chassis: string;
    yearModel: string;
    manufactureYear: string;
    brandModel: string;
    color: string;
  };
  situation?: string;
  history?: {
    robberyOrTheft?: {
      robberyDeclaration: string;
      theftDeclaration: string;
      recoveryDeclaration: string;
    };
    occurrences?: {
      yearBulletin: string;
      manufactureYear: string;
      bulletin: string;
      city: string;
      securityAgencyCode: string;
      occurrenceDate: string;
      dddContactPhone: string;
      informantIdentity: string;
      provenanceIndicator: string;
      cityRegistration: string;
      informantName: string;
      contactPhoneExtension: string;
      contactPhone: string;
      declarationType: string;
      informantDocType: string;
      occurrenceType: string;
      occurrenceState: string;
      plateState: string;
    }[];
  };
};
