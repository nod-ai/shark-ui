# SHARK UI

![The logo for SHARK UI, depicted as the letter "u" with shark teeth and the letter "i" with a shark fin instead of a dot](public/logo/banner-1280x640.png "SHARK UI Logo")

## Introduction

Welcome to SHARK UI! This repo contains a basic app to demonstrate how to use the [Shortfin](https://github.com/nod-ai/shark-ai/tree/main/shortfin) Web APIs for text-to-image and text-to-text inference.

## Preview

![A screenshot of SHARK UI, depicted after a successful inference request for the legendary Blue-Eyes White Snow Cat](docs/screenshots/shark-ui-after-successful-image-generation.png "Shark UI after Successful Image Generation")

## Installation

To get SHARK UI up and running:

1. Clone the project

    ```shell
    git clone https://github.com/nod-ai/shark-ui.git
    cd shark-ui
    ```

1. Configure dependencies
    1. [Install node and npm](https://nodejs.org/en/download)

        1. Prefer the latest LTS version of node (even-numbered major version)
        2. For "using", select `nvm` if available, otherwise select `fnm`
        3. For "with", select `npm`
    1. Install project dependencies, by running (from the project root):

        ```shell
        npm install
        ```

1. Add your environment to the project root:

    ```shell
    echo "VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN=http://localhost:<port-on-virtual-machine-serving-text-to-image-api>" > .env
    ```

1. **If inference is being served from a remote machine**, [have your local machine forward the requests](docs/setup/local_forwarding.md)

## Usage

1. If you haven't already:
    1. [Complete installation](#installation)
    1. Serve the text-to-image API from Shortfin, i.e. [for SDXL](https://github.com/nod-ai/shark-ai/tree/main/shortfin/python/shortfin_apps/sd)
1. Serve the project (and avoid minification) by running:

    ```shell
    npm run dev 
    ```

1. Open the "localhost" URL in your browser of choice.
1. Take it for a spin!

## Development

1. If you haven't already, [complete the basic installation](#installation)
1. In [VSCode](https://code.visualstudio.com/), [add the extensions recommended by the project](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_extension-recommendations).
1. Serve the project with HMR by running:

    ```shell
    npm run dev
    ```

    NOTE: Shows [Vue Dev Tools](https://devtools.vuejs.org/getting-started/features) for debugging UI
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

DISCLAIMER: this application is for demonstration purposes only and is not intended for production environments

## Need Anything?

- [Create an issue](https://github.com/nod-ai/shark-ui/issues)
