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

## Usage

1. If you haven't already:
    1. [Complete installation](#installation)
    1. Server the text-to-image API from Shortfin, i.e. [for SDXL](https://github.com/nod-ai/shark-ai/tree/main/shortfin/python/shortfin_apps/sd)
1. Serve the project (and avoid minification) by running:

    ```shell
    npm run dev 
    ```

1. Open the "Network" URL in your browser of choice.
1. Take it for a spin!

## Development

1. If you haven't already, [complete the basic installation](#installation)
1. In VSCode, [add the extensions recommended by the project](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_extension-recommendations).
1. Lint early and often with [ESLint](https://eslint.org/) by running:

    ```sh
    npm run lint
    ```

1. Run Unit Tests with [Vitest](https://vitest.dev/):

    ```sh
    npm run test:unit
    ```

1. Run End-to-End Tests against the development server with [Cypress](https://www.cypress.io/):

    ```sh
    npm run test:e2e:dev
    ```

    NOTE: It is much faster than doing so against the production build.

## Deployment

1. If you haven't already, [complete the basic installation](#installation)
1. Type-Check, compile and minify for production by running:

    ```sh
    npm run build
    ```

1. Test the production build (e.g. in CI environments):

    ```sh
    npm run test:e2e
    ```
