export interface AuctionII {
  hasAuction: string;
  auctionInfo: AuctionInfo[];
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
