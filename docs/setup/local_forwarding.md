# How to Forward Local Requests to a Remote SSH Machine

## Overview

Because of the safeguards used by modern browsers, some extra configuration might be needed to get AMD-SHARK UI working with AMD-SHARK AI's Shortfin package.

TIP: If you're trying to work with your remote machine's firewall, you're in the right place!

## Context

Consider the following scenario:

|           | ...is running...                                 | Example                                               |
|-----------|--------------------------------------------------|-------------------------------------------------------|
| Machine A | ...an instance of an inference service           | Serving inference via AMD-SHARK AI's Shortfin package |
| Machine B | ...an instance of a browser application service  | Serving AMD-SHARK UI                                  |
| Machine C | ...the browser with which the user will interact | Running Chrome                                        |

If these three machines are not the _same_ machine, then some forwarding will make it straightforward to allow:

1. the browser to access AMD-SHARK UI via the instance of the browser application service

   AND/OR

1. AMD-SHARK UI to access the instance of Shortfin's inference service

## The Long-Term Setup

1. Use VSCode on the same machine that will be running the browser (i.e. your local machine)
1. Install the [Remote SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension
1. Leverage the **automatic port forwarding** by running services from the terminal within VSCode

NOTE: If you don't anticipate a workflow (i.e. development) that requires frequent coordination of the "three machines", just skip to the [The Short-Term Solution](#the-short-term-setup)

## The Short-Term Setup

### Simple Case

When serving both inference and the browser application from the same remote machine, run:

```shell
ssh <user>@<remote-host> \
    -L 8000:localhost:8000 \
    -L 5173:localhost:5173
```

NOTE: uses the default ports

### General Case

```shell
ssh <user>@<remoteA-host> \
    -L <remoteA-port>:localhost:<local-port-A>
```

```shell
ssh <user>@<remoteB-host> \
    -L <remoteB-port>:localhost:<local-port-B>
```

where:

- `<remoteA-...>`: corresponds to the remote machine that's serving inference
- `<remoteB-...>`: corresponds to the remote machine that's serving the browser application
- `<local-port-...>`: the port on the local machine that's forwarding...
  - `<...A>`: ...the requests for inference
  - `<...B>`: ...the requests for the browser application

NOTE: port forwarding will need to be spun up once per terminal session
