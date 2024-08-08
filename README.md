# websocket-basic

A basic websocket server implementation that demonstrates how to authenticate to a websocket connection using a token string added to the query string.

To run:

Initialize the npm node app.

- At the command line, run the command: `npm install`.
- At the command line, run the command: `npm run simulator`
- Connect to the websocket server with the following URL: `localhost:3001?token=your_access_token` (replace localhost if necessary, and replace `your_access_token` with the ACCESS_TOKEN found in the `.env` file.)

Adding a token for authentication

- Rename or copy the `.env.example` file to `.env` and change the ACCESS_TOKEN value to the token value you would like to use.

  Omitting this step will still allow the examples to run, but there will be no authentication.

Helpful links:
https://ably.com/blog/websocket-authentication

### Connecting a websocket client

#### Node

After running the server, open a new terminal window and start the client with the following command: `npm run client`.

You can choose to update the environment variables as needed.

Messages will be exchanged between the server and the client, with the output being displayed in both of the terminals.

#### Postman

Postman can be used as a websocket client. There is a helpful post here on how to use Postman to test the websocket server.
https://apidog.com/blog/test-postman-websockets-connection/

## Contributing

Discover [how to contribute](CONTRIBUTING.md) to this open source project which upholds a standard [code of conduct](CODE_OF_CONDUCT.md).

## Security

Consult our [security policy](SECURITY.md) for best practices using this open source software and to report vulnerabilities.

## License

MIT License

Copyright (c) 2024 [reelyActive](https://www.reelyactive.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
