export interface National {
  yearFabrication: string;
  yearModel: string;
  gearShifter: string;
  loadCapacity: string;
  chassi: string;
  displacement: string;
  vehicleCmt: string;
  srfOrganCode: string;
  fuel: string;
  vehicleColor: string;
  updateDate: string;
  registrationDate: string;
  taxRestrictionLimitDate: string;
  diRegistrationDate: string;
  vehicleSpecies: string;
  miscellaneousInformation: MiscellaneousInformation[];
  brandModel: string;
  city: string;
  bodyNumber: string;
  numberAxes: string;
  diNumber: string;
  auxiliaryAxisNumber: string;
  rearAxisNumber: string;
  engineNumber: string;
  billedIdentificationNumber: string;
  importerIdentificationNumber: string;
  ownerIdentificationNumber: string;
  importProcessNumber: string;
  redaNumber: string;
  vehiclePbt: string;
  plate: string;
  vehiclePower: string;
  provenance: string;
  passengerQuantity: string;
  renavam: string;
  restrictions: Restrictions;
  situation: string;
  chassiSituation: string;
  bodyType: string;
  vehicleType: string;
  billedDocumentType: string;
  importerDocumentType: string;
  ownerDocumentType: string;
  assemblyType: string;
  vehicleImportOperationType: string;
  plateUf: string;
  billingDestinationUf: string;
}

export interface MiscellaneousInformation {
  description: string;
  value: string;
}

export interface Restrictions {
  renajudDetails: RenajudDetails;
  hasGeneralRestrictions: string;
  hasRenajudRestrictions: string;
  hasRobberyOrTheftRestrictions: string;
  restrictionsMessage: string[];
  deregisteredVehicle: string;
}

export interface RenajudDetails {
  hasRenajud: string;
  details: Details;
}

export interface Details {
  yearFabrication: string;
  yearModel: string;
  brandModel: string;
  judicialAuthority: string;
  plate: string;
  process: string;
  renavam: string;
  restrictions: string;
  tribunal: string;
  fuel: string;
  cpfCnpj: string;
  propertyName: string;
}

export interface Renavam {
  plate: string;
  chassi: string;
  renavam: string;
  yearFabrication: string;
  yearModel: string;
  brand: string;
  model: string;
}
