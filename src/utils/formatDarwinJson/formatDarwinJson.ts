import { xml2json } from 'xml-js';

const getText = ({ _text }: { _text?: string | boolean }) => {
  if (!_text) return;
  switch (_text) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      return _text;
  }
};

const getLocation = (location: {
  locationName: { _text?: string };
  crs: { _text?: string };
}) => {
  if (!location) return;
  return {
    locationName: getText(location.locationName),
    crs: getText(location.crs),
  };
};

const removeObjectNestedText = (obj: any) => {
  const formatted: Record<string, string | boolean> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const text = getText(obj[key]);
      if (text) {
        formatted[key] = text;
      }
    }
  }
  return formatted;
};

const getService = (service: any) => {
  if (service?.length) {
    return service.map((s: any) => {
      return mapService(s);
    });
  } else {
    return [mapService(service)];
  }
};

const mapService = (service: any) => {
  const formatted = removeObjectNestedText(service);
  const origin = service?.origin?.location;
  const destination = service?.destination?.location;

  return {
    ...formatted,
    origin: getLocation(origin),
    destination: getLocation(destination),
  };
};

export const formatDarwinJSON = (
  input: XMLHttpRequestBodyInit,
  key: string
) => {
  const json = xml2json(input.toString(), {
    compact: true,
    spaces: 4,
  });

  const jsonParsed = JSON.parse(
    json.replaceAll(/lt(\d+):/g, '').replaceAll('length', 'trainLength')
  );

  const squashedJson =
    jsonParsed!['soap:Envelope']['soap:Body'].GetArrivalBoardResponse[key];
  delete squashedJson._attributes;

  const formatted: Record<string, string | boolean | any[]> = {
    ...removeObjectNestedText(squashedJson),
  };

  const trainServices = getService(squashedJson.trainServices?.service);
  formatted.trainServices = trainServices;

  const busServices = getService(squashedJson.busServices?.service);
  formatted.busServices = busServices;

  return JSON.stringify(formatted, undefined, 4);
};
