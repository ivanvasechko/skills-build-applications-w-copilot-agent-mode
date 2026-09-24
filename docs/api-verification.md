# OctoFit Tracker API verification

Verified on September 24, 2026.

## Configuration

The Node.js API uses port `8000`. Its base URL is selected from the environment:

- With `CODESPACE_NAME`: `https://$CODESPACE_NAME-8000.app.github.dev`
- Without `CODESPACE_NAME`: `http://localhost:8000`

The implementation is in `octofit-tracker/backend/src/config/apiUrl.ts`, and the Express server uses port `8000` by default in `octofit-tracker/backend/src/index.ts`.

## Verification

The backend compiled successfully:

```console
$ npm --prefix octofit-tracker/backend run build
> tsc
```

With the API running on port `8000`, both required endpoints returned HTTP `200` and valid JSON:

```console
$ curl --silent --output /dev/null --write-out '%{http_code}\n' http://localhost:8000/api/users
200

$ curl --silent --output /dev/null --write-out '%{http_code}\n' http://localhost:8000/api/activities
200
```

The `/api/users` response contained 4 records, and `/api/activities` contained 5 records from `octofit_db`.

The localhost fallback was also evaluated with `CODESPACE_NAME` removed:

```console
$ env -u CODESPACE_NAME node -e "import('./octofit-tracker/backend/dist/config/apiUrl.js').then(({apiUrl}) => console.log(apiUrl))"
http://localhost:8000
```

In the active Codespace, the server resolved its public base URL in the expected form:

```text
https://cautious-capybara-x5g9xpjx95qhqq5-8000.app.github.dev
```