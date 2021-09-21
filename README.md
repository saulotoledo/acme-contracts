# Acme contracts

The "Acme contracts" is a small frontend sample application consuming data written
in React for demonstration purposes. It shows a list of contracts and allows them
to be updated.

## Available Scripts

### `npm run sample-server`

Starts a fake REST API server.

The application uses [json-server](https://github.com/typicode/json-server) to
expose a fake API for `contracts`. `GET /contracts` returns a list of contracts.

This server also exposes single contract operations through the endpoint `/contract`.
This is done for demonstration purposes only. A RESTful approach would use the same
resource name in the URI (in this case, `/contracts`).

### `npm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
