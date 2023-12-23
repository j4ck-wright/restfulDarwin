import { soapHeader } from './header';
import { serviceBoardParams } from './params';

export const arrivalsTemplate =
	soapHeader +
	`<soap:Body>` +
	`<ldb:GetArrivalBoardRequest>` +
	serviceBoardParams +
	`</ldb:GetArrivalBoardRequest>` +
	`</soap:Body>` +
	`</soap:Envelope>`;
