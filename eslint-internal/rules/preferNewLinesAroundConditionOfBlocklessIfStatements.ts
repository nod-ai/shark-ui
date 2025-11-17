import {
  AST_NODE_TYPES,
  type TSESLint,
  type TSESTree,
} from '@typescript-eslint/utils';

import {
  isClosingParenToken,
  isOpeningParenToken,
} from '@typescript-eslint/utils/ast-utils';

import {
  Effect,
} from 'effect';

import {
  createInternalRule,
} from '../createInternalRule';

const hasBlock = (
  givenIfStatement: TSESTree.IfStatement,
): boolean => (
  givenIfStatement.consequent.type === AST_NODE_TYPES.BlockStatement
);

type OpeningParenthesisToken = TSESTree.PunctuatorToken & {
  value: '(';
};

type ClosingParenthesisToken = TSESTree.PunctuatorToken & {
  value: ')';
};

const openingParenthesisFrom = (
  givenIfStatement: TSESTree.IfStatement,
  givenSourceCode: TSESLint.SourceCode,
): Effect.Effect<OpeningParenthesisToken> => Effect.gen(function* () {
  const potentialTokenBeforeTest = givenSourceCode.getTokenBefore(givenIfStatement.test);

  const tokenBeforeTest = yield* Effect.fromNullable(potentialTokenBeforeTest).pipe(
    Effect.orDieWith(() => new Error('Expected a token before the test condition')),
  );

  if (
    isOpeningParenToken(tokenBeforeTest)
  ) return tokenBeforeTest;

  return yield* Effect.die('Expected opening parenthesis before test condition');
});

const closingParenthesisFrom = (
  givenIfStatement: TSESTree.IfStatement,
  givenSourceCode: TSESLint.SourceCode,
): Effect.Effect<ClosingParenthesisToken> => Effect.gen(function* () {
  const potentialTokenAfterTest = givenSourceCode.getTokenAfter(givenIfStatement.test);

  const tokenAfterTest = yield* Effect.fromNullable(potentialTokenAfterTest).pipe(
    Effect.orDieWith(() => new Error('Expected a token after the test condition')),
  );

  if (
    isClosingParenToken(tokenAfterTest)
  ) return tokenAfterTest;

  return yield* Effect.dieMessage('Expected closing parenthesis after test condition');
});

const newLineExistsAfter = (
  givenToken: TSESTree.Token,
  givenSourceCode: TSESLint.SourceCode,
): Effect.Effect<boolean> => Effect.gen(function* () {
  const potentialNextToken = givenSourceCode.getTokenAfter(givenToken);

  const nextToken = yield* Effect.fromNullable(potentialNextToken).pipe(
    Effect.orDieWith(() => new Error('Expected a token after the given token')),
  );

  return (givenToken.loc.end.line < nextToken.loc.start.line);
});

const newLineExistsBefore = (
  givenToken: TSESTree.Token,
  givenSourceCode: TSESLint.SourceCode,
): Effect.Effect<boolean> => Effect.gen(function* () {
  const potentialPreviousToken = givenSourceCode.getTokenBefore(givenToken);

  const previousToken = yield* Effect.fromNullable(potentialPreviousToken).pipe(
    Effect.orDieWith(() => new Error('Expected a token before the given token')),
  );

  return (previousToken.loc.end.line < givenToken.loc.start.line);
});

const preferNewLinesAroundConditionOfBlocklessIfStatements = createInternalRule({
  name: 'prefer-new-lines-around-condition-of-blockless-if-statements',
  meta: {
    docs: {
      description: 'Enforce parentheses placement for blockless if statements',
    },
    messages: {
      openingParenthesis: 'Opening parentheses should be on the line before the test condition',
      closingParenthesis: 'Closing parentheses should be on the line after the test condition',
    },
    type   : 'layout',
    schema : [],
    fixable: 'whitespace',
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.sourceCode;

    const reportOpeningParenthesisIn = (
      givenIfStatement: TSESTree.IfStatement,
    ): Effect.Effect<void> => Effect.gen(function* () {
      const derivedOpeningParenthesis = yield* openingParenthesisFrom(givenIfStatement, sourceCode);

      if (
        yield* newLineExistsAfter(derivedOpeningParenthesis, sourceCode)
      ) return;

      context.report({
        node     : givenIfStatement,
        messageId: 'openingParenthesis',
        fix      : ($0) => $0.insertTextAfter(derivedOpeningParenthesis, '\n'),
      });
    });

    const reportClosingParenthesisIn = (
      givenIfStatement: TSESTree.IfStatement,
    ): Effect.Effect<void> => Effect.gen(function* () {
      const derivedClosingParenthesis = yield* closingParenthesisFrom(givenIfStatement, sourceCode);

      if (
        yield* newLineExistsBefore(derivedClosingParenthesis, sourceCode)
      ) return;

      context.report({
        node     : givenIfStatement,
        messageId: 'closingParenthesis',
        fix      : ($0) => $0.insertTextBefore(derivedClosingParenthesis, '\n'),
      });
    });

    return {
      IfStatement: (someIfStatement) => Effect.gen(function* () {
        if (
          hasBlock(someIfStatement)
        ) return;

        yield* reportOpeningParenthesisIn(someIfStatement);
        yield* reportClosingParenthesisIn(someIfStatement);
      }).pipe(Effect.runSync),
    };
  },
});

export {
  preferNewLinesAroundConditionOfBlocklessIfStatements,
};
