import { xml2json } from 'xml-js';
import { ILocation, IMappedService } from '../../types/Darwin';
import {
  ILocationRaw,
  IServiceRaw,
  IServiceResponseRaw,
  IText,
  InrccMessageRaw,
} from '../../types/DarwinRaw';

const instanceOfIText = (object: unknown): object is IText => {
  if (typeof object === 'object' && object) {
    return '_text' in object;
  }
  return false;
};

const getText = ({ _text }: IText) => {
  return _text;
};

const getLocation = ({ location }: ILocationRaw) => {
  if (!location) return;
  return {
    locationName: getText(location.locationName),
    crs: getText(location.crs),
  } as ILocation;
};

const handleNrccMessages = (nrcc?: InrccMessageRaw) => {
  const messages = nrcc?.message;
  if (!messages) return;
  if (instanceOfIText(messages)) {
    return [messages._text];
  } else {
    return messages.map((msg) => {
      return msg._text;
    });
  }
};

const mapService = (services: IServiceRaw[]) => {
  return services.map((service) => {
    const serviceData: Record<string, string | ILocation | undefined> = {};
    for (const [key, value] of Object.entries(service)) {
      if (instanceOfIText(value)) {
        serviceData[key] = value._text;
      }
    }

    if (service.origin) {
      serviceData.origin = getLocation(service.origin);
    }

    if (service.destination) {
      serviceData.destination = getLocation(service.destination);
    }

    return serviceData as unknown as IMappedService[];
  });
};

export const formatDarwinJSON = (
  input: XMLHttpRequestBodyInit,
  key: string
) => {
  const json = xml2json(input.toString(), {
    compact: true,
    spaces: 4,
  });

  let cleanJson = JSON.parse(
    json
      .replaceAll(/lt(\d+):/g, '') // Removes ltn: where n is an integer
      .replaceAll(/lt:/g, '') // Removes lt: found in nrccMessages
      .replaceAll('length', 'serviceLength') // Renames length to serviceLength to use .length in an object
  );

  cleanJson =
    cleanJson['soap:Envelope']['soap:Body'][key].GetStationBoardResult;

  delete cleanJson._attributes;

  // We're now at a state where we can start to manipulate the response easier
  const raw: IServiceResponseRaw = cleanJson;
  const formatted: Record<string, unknown> = {};

  for (const rawKey in raw) {
    const val = raw[rawKey as keyof IServiceResponseRaw];
    if (instanceOfIText(val)) {
      formatted[rawKey] = getText(val);
    }
  }

  formatted.nrccMessages =
    handleNrccMessages(raw?.nrccMessages) || ([] as string[]);

  if (raw.trainServices && raw.trainServices.service) {
    formatted.trainServices = mapService(raw.trainServices.service);
  } else {
    formatted.trainServices = [];
  }

  if (raw.busServices && raw.busServices.service) {
    formatted.busServices = mapService(raw.busServices.service);
  } else {
    formatted.busServices = [];
  }

  return JSON.stringify(formatted, undefined, 4);
};
