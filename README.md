# restfulDarwin (Work in Progress)

A JSON RESTful API of National Rail's Darwin SOAP API

## About

National Rail's public [Darwin API](https://lite.realtime.nationalrail.co.uk/openldbws/) currently uses a Simple Object Access Protocol (SOAP) API and so this repo aims at being a middle man to convert the SOAP response into easier to read JSON format.

## Setup

Development

```
yarn
yarn dev
```

Production

```
yarn
yarn start
```

By default, the server will run on port 3000 unless otherwise specified in an env var. When running, expect to see `🚝 - Darwin is listening on http://localhost:3000`

Swagger documentation can be found on `/docs`
