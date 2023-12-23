import { soapHeader } from './header';
import { serviceBoardParams } from './params';

export const departuresTemplate =
  soapHeader +
  `<soap:Body>` +
  `<ldb:GetDepartureBoardRequest>` +
  serviceBoardParams +
  `</ldb:GetDepartureBoardRequest>` +
  `</soap:Body>` +
  `</soap:Envelope>`;
