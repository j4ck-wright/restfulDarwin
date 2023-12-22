export interface IArrivals {
  numRows?: string | number;
  crs: string;
  filterCrs?: string;
  filterType?: 'to' | 'from';
  timeOffset?: number;
  timeWindow?: number;
}
