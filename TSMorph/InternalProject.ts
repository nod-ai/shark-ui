import {
  fileURLToPath,
} from 'node:url';

import {
  IndentationText,
  Project,
  QuoteKind,
} from 'ts-morph';

class InternalProject
  extends Project {
  public constructor() {
    const tsConfigURL = new URL('../tsconfig.json', import.meta.url);

    super({
      tsConfigFilePath    : fileURLToPath(tsConfigURL),
      manipulationSettings: {
        indentationText  : IndentationText.TwoSpaces,
        quoteKind        : QuoteKind.Single,
        useTrailingCommas: true,
      },
    });
  }
}

export {
  InternalProject,
};
