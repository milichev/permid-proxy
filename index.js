const hapi = require('hapi');
const axios = require('axios');
const argv = require('yargs').argv;

const port = argv.PORT || 1380;
const host = argv.HOST || 'localhost';
const token = argv.PERMID_TOKEN || '';

if (!token) {
  throw new Error('No PermID token provided');
}

const server = new hapi.Server({
  debug: {log: ['error', 'info']},
});

server.connection({port, host});

// noinspection JSUnusedGlobalSymbols
server.route({
  method: 'GET',
  path: '/api/permid/search',
  config: {
    cors: {
      origin: ['*'],
      exposedHeaders: ['Authorization'],
    },
  },
  handler(request, reply) {
    if (!request.query.q) {
      return reply('Required query string parameter q missing')
        .code(400);
    }

    axios.get(
      `https://api.thomsonreuters.com/permid/search?q=${encodeURIComponent(
        request.query.q)}`,
      {
        headers: {'X-AG-Access-Token': token},
      },
         )
         .then(permIdResponse => reply(permIdResponse.data));
  },
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
