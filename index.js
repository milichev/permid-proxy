const hapi = require("@hapi/hapi");
const axios = require("axios");
const argv = require("yargs").argv;

const port = argv.PORT || 1380;
const host = argv.HOST || "localhost";
const token = argv.PERMID_TOKEN || "";

if (!token) {
  throw new Error("No PermID token provided");
}

const server = new hapi.Server({
  port,
  host,
  debug: { log: ["error", "info"] },
});

const path = "/api/permid/search";

// noinspection JSUnusedGlobalSymbols
server.route({
  method: "GET",
  path,
  config: {
    cors: {
      origin: ["*"],
      exposedHeaders: ["Authorization"],
    },
  },
  async handler(request, h) {
    if (!request.query.q) {
      return h.response("Required query string parameter q missing").code(400);
    }

    return axios
      .get(
        `https://api.thomsonreuters.com/permid/search?q=${encodeURIComponent(
          request.query.q
        )}`,
        {
          headers: { "X-AG-Access-Token": token },
        }
      )
      .then((permIdResponse) => h.response(permIdResponse.data))
      .catch((error) => {
        const { data, status, headers } = error.response;
        return h
          .response({
            error: {
              message: "The underlying service returned error",
              status,
              data,
              headers,
            },
          })
          .code(500);
      });
  },
});

server
  .start()
  .then(() => {
    console.log(`Server is running at: ${server.info.uri}${path}`);
  })
  .catch((err) => {
    console.error("Error starting server", err);
    process.exit(1);
  });
