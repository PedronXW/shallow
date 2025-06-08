export interface AuctionIV {
  id: number;
  vehicle: Vehicle | undefined;
  auction: Auction[];
  scoreClassification: ScoreClassification[] | undefined;
}

export interface Vehicle {
  plate: string;
  chassis: string;
  manufacturer: string;
  model: string;
  yearOfManufacture: number;
  yearOfModel: number;
  color: string;
  fuel: string;
  vehicleType: string;
}

export interface Auction {
  auctionNumber: number;
  date: string;
  auctioneer: string;
  lot: number;
  committer: string;
  condition: string;
  score: number;
  classification: string;
}

export interface ScoreClassification {
  index: number;
  description: string;
  observation: string;
}
