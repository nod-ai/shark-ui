# shark-ui

## Introduction

Welcome to SHARK UI! This repo contains a basic app to demonstrate how to use the [Shortfin](https://github.com/nod-ai/shark-ai/tree/main/shortfin) Web APIs for text-to-image and text-to-text inference.

## Installation

To get SHARK UI up and running:

1. Clone the project

    ```shell
    git clone https://github.com/nod-ai/shark-ui.git && cd shark-ui
    ```

1. Configure dependencies
    1. [Install node and npm](https://nodejs.org/en/download)

        NOTE: prefer the latest LTS version of node (even-numbered major version)
    1. Install project dependencies, by running (from the project root):

        ```shell
        npm install
        ```

1. Configure environment
    1. Open in [VSCode](https://code.visualstudio.com/)
        NOTE: Recommended because of the included workspace settings and recommended extensions
    1. Add a `.env` file to the project root:

        ```env
        VITE_TEXT_TO_IMAGE_API_ORIGIN=http://<shortfin-server-ip-address>:<server-port>
        ```

        OR

        ```env
        VITE_TEXT_TO_IMAGE_API_ORIGIN=http://www.example.com
        ```

        NOTE: https is not yet supported

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
