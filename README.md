# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Deploying to Vercel

This project is configured for Vercel. Import the GitHub repository into Vercel and set the project root to the directory containing this `package.json` (the repository root for `Techguild_FrontEnd`). Vercel can then use the checked-in settings:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

The rewrite in `vercel.json` serves the React app for client-side routes, so direct visits and refreshes on nested pages continue to work. Vercel will create deployments when changes are pushed to the connected repository.

If the app needs environment variables, add them in the Vercel project's **Settings → Environment Variables** for the relevant deployment environments, then redeploy. Do not commit local `.env` files or put secrets in `VITE_` variables; those are included in browser code.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
