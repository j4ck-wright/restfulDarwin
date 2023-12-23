FROM node:18-alpine AS build

WORKDIR /app
COPY . .
RUN yarn
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline --frozen-lockfile

FROM node:18-alpine AS runner
COPY --from=build /app/dist dist/
COPY --from=build /app/node_modules node_modules/
COPY --from=build /app/package.json .

EXPOSE 3000

CMD ["yarn", "start"]
