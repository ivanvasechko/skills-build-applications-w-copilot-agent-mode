# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Environment variables

The app calls the Octofit Tracker API at
`https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`.

Create a `.env.local` file (see `.env.local.example`) in this folder and set
`VITE_CODESPACE_NAME` to your Codespace name (the part before
`-8000.app.github.dev` in the forwarded port 8000 URL). If unset, the app
falls back to `http://localhost:8000` instead of requesting an invalid
`https://undefined-8000...` URL.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
