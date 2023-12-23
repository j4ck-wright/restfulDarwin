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
