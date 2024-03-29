import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  darwin_endpoint:
    process.env.DARWIN_ENDPOINT ||
    'https://lite.realtime.nationalrail.co.uk/OpenLDBWS/ldb11.asmx',
};
