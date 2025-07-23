# Developer Setup

Let's sink some teeth into SHARK UI!

## Prerequisites

1. Follow the [common prerequisites](common_prerequisites.md)
1. [Install node and npm](https://nodejs.org/en/download):
    1. Prefer the latest LTS version of node (even-numbered major version)
    2. For "using", select `nvm` if available, otherwise select `fnm`
    3. For "with", select `npm`

## Installation

1. Clone the latest version

    ```shell
    git clone https://github.com/nod-ai/shark-ui.git
    cd shark-ui
    ```

1. Install it's dependencies:

    ```shell
    npm install
    ```

    NOTE: relies on the [npm prerequisite](#prerequisites)

## Configuration

As mentioned in the [common prerequisites](#prerequisites), Shortfin defines an inference service for SHARK UI to use.

To point SHARK UI to a running service, add a configured environment:

```shell
echo "VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN=http://localhost:<port>" > .env
```

where:

- `<port>`: the port through which the server is handling inference requests

## Development

1. **If you haven't already**, complete:
    1. [installation](#installation)
    2. [configuration](#configuration)
1. In [VSCode](https://code.visualstudio.com/), [add the extensions recommended by the project](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_extension-recommendations).
1. Serve the project with [Hot Module Replacement](https://vite.dev/guide/features.html#hot-module-replacement) by:

    - using the default port (5173):

        ```shell
        npm run dev
        ```

    NOTE: Shows [Vue Dev Tools](https://devtools.vuejs.org/getting-started/features) for debugging UI

## Validation

1. Lint early and often with [ESLint](https://eslint.org/) by running:

    ```shell
    npm run lint
    ```

1. Run [unit tests](../testing/unit/development.md):

1. Run End-to-End Tests against the development server with [Cypress](https://www.cypress.io/):

    ```shell
    npm run test:e2e:dev
    ```

    NOTE: It is much faster than doing so against the production build.
