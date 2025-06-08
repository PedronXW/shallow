export interface AuctionI {
  hasAuction: string;
  auctionInfo: AuctionInfo[];
  remarketing: Remarketing;
  score: string;
  scoreData: ScoreData[];
  searchHistory: SearchHistory;
  checklist: Checklist;
}

export interface Checklist {
  hasRegister: string;
  front: string;
  back: string;
  ceiling: string;
  inside: string;
  leftSide: string;
  rightSide: string;
  tires: string;
  burned: string;
  airbag: string;
  obs: string;
}

export interface ScoreData {
  header: string;
  percentage: string;
  label: string;
  description: string;
}

export interface SearchHistory {
  hasRegister: string;
  searchQuantity: string;
  history: string;
}

export interface AuctionInfo {
  yearOfManufacture: string;
  yearOfModel: string;
  gearbox: string;
  body: string;
  category: string;
  chassis: string;
  fuel: string;
  committer: string;
  generalVehicleCondition: string;
  color: string;
  auctionDate: string;
  rearAxle: string;
  imported: string;
  mileage: string;
  auctioneer: string;
  lot: string;
  brand: string;
  model: string;
  engine: string;
  patio: string;
  plate: string;
  numberOfAxles: string;
  renavam: string;
  chassisSituation: string;
  state: string;
  images: string[];
}

export interface Remarketing {
  hasError: string;
  hasRa: string;
  vehicleInformation: VehicleInformation;
  auctionsList: AuctionList[];
  photosList: string[];
  pontuation: string;
  acceptVehicle: string;
  percentageOnRef: string;
  specialInspectionRequirement: string;
  inspectionDate: string;
  engine: string;
  trunk: string;
  front: string;
  rightFront: string;
  leftFront: string;
  doorRightFront: string;
  doorLeftFront: string;
  doorRightBack: string;
  doorLeftBack: string;
  backRight: string;
  backLeft: string;
  rightSide: string;
  leftSide: string;
  tireRightFront: string;
  tireLeftFront: string;
  tireRightBack: string;
  tireLeftBack: string;
  back: string;
  truck: string;
  frontSeats: string;
  backSeats: string;
  ceilingLining: string;
  ceiling: string;
  frontFairing: string;
  rightFairing: string;
  leftFairing: string;
  fuelTank: string;
  obs: string;
  link1: string;
  link2: string;
  warranty: string;
}

export interface VehicleInformation {
  brand: string;
  model: string;
  yearOfManufacture: string;
  yearOfModel: string;
  plate: string;
  chassis: string;
  renavam: string;
  color: string;
  fuel: string;
  category: string;
  engine: string;
  gearbox: string;
  rearAxle: string;
  body: string;
  numberOfAxles: string;
  chassisSituation: string;
}

export interface AuctionList {
  auctionDate: string;
  item: string;
  organizer: string;
  chassisSituation: string;
  seller: string;
  vehicleCondition: string;
  gearboxCondition: string;
  engineCondition: string;
  mechanicalCondition: string;
  obs: string;
}
