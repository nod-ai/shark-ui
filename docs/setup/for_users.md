# User Setup

Let's get SHARK UI up and swimming!

## [Prerequisites](common_prerequisites.md)

## Installation

1. Go to [the latest release](https://github.com/nod-ai/shark-ui/releases)
1. Find the "Assets" section of the release
1. Download a versioned copy
    - i.e. "package-v1.0.0.zip"
1. Extract it.

## Configuration

Now, specify the existing Shortfin text-to-image server so the SHARK UI knows where to send generation requests:

1. Open "config/text-to-image.json"
1. For `server`, supply the details for your Shortfin text-to-image server, e.g.:
    - Before:

        ```json
        "server": {
            "origin": null
        }
        ```

    - After:

        ```json
        "server": {
            "origin": "http://localhost:8000"
        }
        ```

    - NOTE: Assumes you've already met the [prerequisite](#prerequisites) of having your local machine forward requests to the inference server
1. Save!

## Serving

1. In a fresh terminal session, navigate to the just-configured package
1. Serve the package:
    - **If the machine already has Python installed**, run:

        ```shell
        python -m http.server 8080
        ```

    - **If the machine already has Node installed**, run:

        ```shell
        npm install --global http-server
        http-server . --port 8080
        ```

    - NOTE: the port (i.e. 8080) must be different from the one used for the inference service (i.e. 8000)
1. In a modern browser, visit <http://localhost:8080>
