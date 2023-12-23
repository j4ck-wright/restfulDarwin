import { buildXMLString } from './';
import { departuresTemplate, serviceDetailsTemplate } from '../templates';

import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';

import { IServiceBoard, IServiceDetails } from '../../types/Darwin';

describe('requestBuilder.ts test suite', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('returns correct xml string departure board with mandatory fields', () => {
    const departureOptions: IServiceBoard = {
      crs: 'XXX',
    };

    const xmlString = buildXMLString(
      departuresTemplate,
      'dummy-token',
      departureOptions
    );

    expect(xmlString).toEqual(
      `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2017-10-01/ldb/"><soap:Header><typ:AccessToken><typ:TokenValue>dummy-token</typ:TokenValue></typ:AccessToken></soap:Header><soap:Body><ldb:GetDepartureBoardRequest><ldb:crs>XXX</ldb:crs></ldb:GetDepartureBoardRequest></soap:Body></soap:Envelope>`
    );
  });

  it('returns correct xml string for departure board with all values added', () => {
    const departureOptions: IServiceBoard = {
      crs: 'XXX',
      numRows: 2,
      filterCrs: 'YYY',
      filterType: 'from',
      timeOffset: 5,
      timeWindow: 10,
    };

    const xmlString = buildXMLString(
      departuresTemplate,
      'dummy-token',
      departureOptions
    );

    expect(xmlString).toEqual(
      `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2017-10-01/ldb/"><soap:Header><typ:AccessToken><typ:TokenValue>dummy-token</typ:TokenValue></typ:AccessToken></soap:Header><soap:Body><ldb:GetDepartureBoardRequest><ldb:numRows>2</ldb:numRows><ldb:crs>XXX</ldb:crs><ldb:filterCrs>YYY</ldb:filterCrs><ldb:filterType>from</ldb:filterType><ldb:timeOffset>5</ldb:timeOffset><ldb:timeWindow>10</ldb:timeWindow></ldb:GetDepartureBoardRequest></soap:Body></soap:Envelope>`
    );
  });

  it('should return correct xml string for service details', () => {
    const serviceOptions: IServiceDetails = {
      serviceID: 'XXX',
    };

    const xmlString = buildXMLString(
      serviceDetailsTemplate,
      'dummy-token',
      serviceOptions
    );

    expect(xmlString).toEqual(
      `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:typ="http://thalesgroup.com/RTTI/2013-11-28/Token/types" xmlns:ldb="http://thalesgroup.com/RTTI/2017-10-01/ldb/"><soap:Header><typ:AccessToken><typ:TokenValue>dummy-token</typ:TokenValue></typ:AccessToken></soap:Header><soap:Body><ldb:GetServiceDetailsRequest><ldb:serviceID>XXX</ldb:serviceID></ldb:GetServiceDetailsRequest></soap:Body></soap:Envelope>`
    );
  });
});
