import { IServiceBoard, IServiceDetails } from '../../types/Darwin';

export function buildXMLString(
  template: string,
  token: string,
  options: IServiceDetails | IServiceBoard
) {
  let output = template.replace('!!TokenValue!!', token as string);

  for (const [key, value] of Object.entries(options)) {
    if (value && value !== null && value !== 'null') {
      output = output.replace('!!' + `${key}` + '!!', `${value}`);
    }
  }

  const removeEmptyValues = new RegExp('(<.*?!!.*?!!.*?>)', 'g');

  output = output.replaceAll(removeEmptyValues, '');
  output = output.replaceAll('\n', '');

  return output;
}
