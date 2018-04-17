# permid-proxy

> The very simple proxy for https://permid.org service

## Installation

Run the command:

```
yarn install permid-proxy
```

## Usage

### PermID token

The service accepts only requests with the PermID token provided.

Here is how to get it:

1. Go to https://permid.org website,
2. Authorise there,
3. Click _API_ link in the top right corner,
4. Click _Display my API token_

Store the token string securely and provide it to the permid-proxy app
in `PERMID_TOKEN` process argument.

### Running

Start the app with the command in the project root:

```
node node_modules\permid-proxy\index.js --PERMID_TOKEN <token> --PORT 2222 --HOST 127.0.0.1
```

where <token> is the PermID API token you've got as described above.

#### Parameters

* `PERMID_TOKEN`: Required. The service fails to start without it.
* `HOST`: Optional. Default: `localhost`
* `PORT`: Optional. Default: `1380`.

### Query

Query the service with the link:
http://localhost:1380/api/permid/search?q=TRI
where `TRI` is the search term.

## Contributing

Feel free to extend, fix and improve the service.

## License

The project is distributed under the GNU GENERAL PUBLIC LICENSE.
