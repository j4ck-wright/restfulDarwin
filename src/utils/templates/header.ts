export const soapHeader =
  '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2017-10-01/ldb/">' +
  `<soap:Header>` +
  `<typ:AccessToken>` +
  `<typ:TokenValue>!!TokenValue!!</typ:TokenValue>` +
  `</typ:AccessToken>` +
  `</soap:Header>`;
