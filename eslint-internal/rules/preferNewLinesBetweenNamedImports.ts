import {
  AST_NODE_TYPES,
  type TSESTree,
} from '@typescript-eslint/utils';

import {
  isNonEmptyArray,
} from 'effect/Array';

import {
  createInternalRule,
} from '../createInternalRule';

const endPositionOfFirstCharacterOf = (
  givenSpecifier: TSESTree.ImportSpecifier,
): TSESTree.Position => ({
  line  : givenSpecifier.loc.start.line,
  column: givenSpecifier.loc.start.column + 1,
});

const locationOfFirstCharacterOf = (
  givenSpecifier: TSESTree.ImportSpecifier,
): TSESTree.SourceLocation => ({
  start: givenSpecifier.loc.start,
  end  : endPositionOfFirstCharacterOf(givenSpecifier),
});

const preferNewLinesBetweenNamedImports = createInternalRule({
  name: 'prefer-new-lines-between-named-imports',
  meta: {
    docs: {
      description: 'Enforce newlines between named imports in import declarations',
    },
    messages: {
      missingNewLine: 'Each named import should be on its own line',
    },
    type   : 'layout',
    schema : [],
    fixable: 'whitespace',
  },
  defaultOptions: [],
  create        : (context) => ({
    ImportDeclaration: (someImportDeclaration) => {
      const namedSpecifiers = someImportDeclaration.specifiers.filter(($0) => $0.type === AST_NODE_TYPES.ImportSpecifier);

      if (
        !isNonEmptyArray(namedSpecifiers)
      ) return;

      const reportFixableMissingNewLineBefore = (
        givenSpecifier: TSESTree.ImportSpecifier,
      ): void => {
        context.report({
          node     : someImportDeclaration,
          messageId: 'missingNewLine',
          loc      : locationOfFirstCharacterOf(givenSpecifier),
          fix      : ($0) => $0.insertTextBefore(givenSpecifier, '\n'),
        });
      };

      namedSpecifiers.forEach((eachSpecifier, indexOfEachSpecifier) => {
        if (
          indexOfEachSpecifier === 0
        ) return;

        const previousSpecifier = namedSpecifiers[indexOfEachSpecifier - 1];

        if (
          previousSpecifier.loc.end.line === eachSpecifier.loc.start.line
        ) reportFixableMissingNewLineBefore(eachSpecifier);
      });
    },
  }),
});

export {
  preferNewLinesBetweenNamedImports,
};
