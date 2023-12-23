export interface IServiceBoard {
  numRows?: string | number;
  crs: string;
  filterCrs?: string;
  filterType?: 'to' | 'from';
  timeOffset?: number;
  timeWindow?: number;
}

export interface IServiceDetails {
  serviceID: string;
}

export interface ILocation {
  locationName: string;
  crs: string;
}

export interface IMappedService {
  sta: string;
  eta: string | 'On time' | 'Delayed' | 'Cancelled';
  platform?: string;
  operator: string;
  operatorCode: string;
  serviceType: 'train' | 'bus';
  trainLength?: string;
  serviceID: string;
  nrccMessages: string[];
  rsid?: string;
  origin?: ILocation;
  destination?: ILocation;
}

export interface IMappedResponse {
  generatedAt: string;
  locationName: string;
  crs: string;
  platformAvailable: boolean;
  trainServices: IMappedService[];
  busServices: IMappedService[];
}
