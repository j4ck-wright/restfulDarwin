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
        `ERROR ~ fetchDarwinResponse: (${error.response?.status} - ${error.code}) ${error.response?.data}`
      );
      if (error.status) {
        statusCode = error.status;
      }
    } else {
      console.error(`ERROR ~ fetchDarwinResponse: ${error}`);
    }
  }
  return { status: statusCode, data };
};
