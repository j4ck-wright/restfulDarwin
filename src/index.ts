const Koa = require("koa");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const logger = require("koa-logger");

const app = new Koa();
const PORT = process.env.PORT || 3000;

app.use(bodyParser());
app.use(cors({ origin: "*" }));
app.use(logger());
app.use(json());

const server = app
  .listen(PORT, async () => {
    console.log(`🚝 - Darwin is listening on http://localhost:${PORT}`);
  })
  .on("error", (err: unknown) => {
    console.error(err);
  });
