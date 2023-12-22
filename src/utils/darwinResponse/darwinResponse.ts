import axios from 'axios';
import { config } from '../../config';

export const fetchDarwinResponse = async (xmlBody: string) => {
  let statusCode = 500;
  let data;

  try {
    const request = await axios.post(
      config.darwin_endpoint as string,
      xmlBody,
      {
        headers: { 'Content-Type': 'text/xml' },
      }
    );
    statusCode = request.status;
    data = request.data as XMLHttpRequestBodyInit;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        `ERROR ~ fetchDarwinResponse: (${error.code}) ${error.response}`
      );
      if (error.code) {
        statusCode = Number(error.code);
      }
    } else {
      console.error(`ERROR ~ fetchDarwinResponse: ${error}`);
    }
  }
  return { status: statusCode, data };
};
