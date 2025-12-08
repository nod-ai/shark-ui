import type {
  TSESTree,
} from '@typescript-eslint/utils';

import {
  Effect,
} from 'effect';

import {
  escape,
} from 'effect/RegExp';

import {
  createInternalRule,
} from '../createInternalRule';

const TypeScript_File_Path_extension = '.ts';

interface WhitelistOption {
  allow: string[];
}

const requireExtensionForTSModules = createInternalRule({
  name: 'require-extension-for-ts-modules',
  meta: {
    docs: {
      description: `Enforce specifying ${TypeScript_File_Path_extension} extensions for specific import paths`,
    },
    messages: {
      requireExtension: `Import path "{{path}}" must include ${TypeScript_File_Path_extension} extension because it matches whitelisted filename "{{filename}}"`,
      forbidExtension : `Import path "{{path}}" must not include ${TypeScript_File_Path_extension} extension because it does not match any whitelisted filename`,
    },
    type  : 'problem',
    schema: [
      {
        type      : 'object',
        properties: {
          allow: {
            type       : 'array',
            description: 'A list of filenames that are allowed to have the .ts extension',
            items      : {
              type: 'string',
            },
            minItems   : 1,
            uniqueItems: true,
          },
        },
        required: [
          'allow',
        ],
        additionalProperties: false,
      },
    ],
    fixable: 'code',
  },
  defaultOptions: [
    {
      allow: [],
    },
  ],
  create: (
    context,
    options: readonly [
      WhitelistOption,
    ],
  ) => Effect.gen(function* () {
    const whitelistedFilenames = options[0].allow;

    if (
      whitelistedFilenames.some(($0) => !$0.endsWith(TypeScript_File_Path_extension))
    ) return yield* Effect.dieMessage(`All filenames must end with ${TypeScript_File_Path_extension}.`);

    if (
      whitelistedFilenames.some(($0) => $0.includes('/'))
    ) return yield* Effect.dieMessage('All filenames must exclude their enveloping directories.');

    const ensureTSExtensionForWhitelistedPath = (
      givenNode:
        | TSESTree.ImportDeclaration
        | TSESTree.ExportNamedDeclaration
        | TSESTree.ExportAllDeclaration,
    ): void => Effect.gen(function* () {
      const modulePathLiteral = yield* Effect.fromNullable(givenNode.source);

      const modulePath = modulePathLiteral.value;

      if (modulePath.endsWith(TypeScript_File_Path_extension)) {
        const modulePathShouldKeepExtension = whitelistedFilenames.some(($0) => modulePath.endsWith($0));

        if (
          modulePathShouldKeepExtension
        ) return yield* Effect.void;

        const modulePathWithoutExtension = modulePath.replace(new RegExp(`${escape(TypeScript_File_Path_extension)}$`), '');

        context.report({
          node     : modulePathLiteral,
          messageId: 'forbidExtension',
          data     : {
            path: modulePath,
          },
          fix: ($0) => $0.replaceText(modulePathLiteral, `'${modulePathWithoutExtension}'`),
        });
      }
      else {
        const modulePathWithExtension = `${modulePath}${TypeScript_File_Path_extension}`;

        const matchingFilename = yield* Effect.fromNullable(
          whitelistedFilenames.find(($0) => modulePathWithExtension.endsWith($0)),
        );

        context.report({
          node     : modulePathLiteral,
          messageId: 'requireExtension',
          data     : {
            path    : modulePath,
            filename: matchingFilename,
          },
          fix: ($0) => $0.replaceText(modulePathLiteral, `'${modulePathWithExtension}'`),
        });
      }
    }).pipe(
      Effect.orElse(() => Effect.void),
      Effect.runSync,
    );

    return {
      ImportDeclaration     : ensureTSExtensionForWhitelistedPath,
      ExportNamedDeclaration: ensureTSExtensionForWhitelistedPath,
      ExportAllDeclaration  : ensureTSExtensionForWhitelistedPath,
    };
  }).pipe(Effect.runSync),
});

export {
  requireExtensionForTSModules,
};
