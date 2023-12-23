import { soapHeader } from './header';

export const serviceDetailsTemplate =
	soapHeader +
	`<soap:Body>` +
	`<ldb:GetServiceDetailsRequest>` +
	'\n' +
	`<ldb:serviceID>!!serviceID!!</ldb:serviceID>` +
	`</ldb:GetServiceDetailsRequest>` +
	`</soap:Body>` +
	`</soap:Envelope>`;
