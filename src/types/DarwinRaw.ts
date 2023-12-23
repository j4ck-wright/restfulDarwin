export interface IText {
  _text: string;
}

export interface ILocationRaw {
  location: { locationName: IText; crs: IText };
}

export interface IServiceResponseRaw {
  generatedAt: IText;
  locationName: IText;
  crs: IText;
  nrccMessages?: InrccMessageRaw;
  platformAvailable: IText;
  trainServices?: { service?: IServiceRaw[] };
  busServices?: { service?: IServiceRaw[] };
}

export interface InrccMessageRaw {
  message: IText | IText[];
}

export interface IServiceRaw {
  sta: IText;
  eta: IText;
  platform?: IText;
  operator: IText;
  operatorCode: IText;
  serviceType: IText;
  trainLength?: IText;
  serviceID: IText;
  rsid?: IText;
  origin?: ILocationRaw;
  destination?: ILocationRaw;
}
