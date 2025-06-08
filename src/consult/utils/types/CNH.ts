export interface CNH {
  execReturn: string;
  description: string;
  conductorData?: ConductorData;
  licenseData?: LicenseData;
  pontuation?: Pontuation;
  courses?: Course[];
  exams?: Exam[];
  infractions?: Infraction[];
  blocks?: Block[];
}

export interface Block {
  description: string;
  date: string;
  dateEndPenalty: string;
  dateInitPenalty: string;
  dateLiberty: string;
  docGeneratorBlockLiberty: string;
  docGeneratorBlock: string;
  blockReason: string;
  libertyReason: string;
  respLiberty: string;
  responsableBlock: string;
  penaltyTime: string;
  totalPenaltyTime: string;
  cnhWithdrawal: string;
  libertyRequirements: string;
  updateType: string;
  blockDecisionType: string;
  uf: string;
  libertyUfDetran: string;
}

export interface Course {
  courseDescription: string;
  workload: string;
  category: string;
  cnpjCredentialedEntity: string;
  cpfProfessional: string;
  startDate: string;
  endDate: string;
  validityDate: string;
  modality: string;
  courseCity: string;
  certificateNumber: string;
  updateType: string;
  ufCourse: string;
}

export interface LicenseData {
  renavamNumber: string;
  registerNumber: string;
  category: string;
  emissionDate: string;
  validityDate: string;
  firstLicenseDate: string;
  observation: string;
  ordinance: string;
  impediment: string;
}

export interface ConductorData {
  name: string;
  cpf: string;
  birthDate: string;
  uf: string;
  fatherName: string;
  motherName: string;
}

export interface Exam {
  examDescription: string;
  allowedCategory: string;
  intendedCategory: string;
  cnpjCredentialedEntity: string;
  cpfProfessional1: string;
  cpfProfessional2: string;
  examDate: string;
  validityDate: string;
  examCity: string;
  observation: string;
  restrictions: string;
  result: string;
  updateType: string;
  ufExam: string;
}

export interface Infraction {
  autoNumber: string;
  autuadorAgency: string;
  infractionDate: string;
  description: string;
  licensePlate: string;
  location: string;
  points: string;
  fineNumber: string;
  process: string;
  situation: string;
  pointsResponsible: string;
  value: string;
}

export interface Pontuation {
  totalPoint: string;
  infractionsPointLast5Years: string;
  infractionsPointLast12Months: string;
  mandatoryInfractionsLast12Months: string;
  mandatoryInfractionsLast5Years: string;
  defenseTerm: string;
  penalResource: string;
  suspensiveEffect: string;
  suspensiveEffectJud: string;
}