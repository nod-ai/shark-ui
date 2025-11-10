import {
  Path,
} from '@effect/platform';

import {
  Effect,
} from 'effect';

class TypeScript_File_Path implements Path.Path.Parsed {
  public static readonly extension = '.ts';

  private constructor(
    public readonly root: string,
    public readonly dir: string,
    public readonly base: string,
    public readonly ext: typeof TypeScript_File_Path.extension,
    public readonly name: string,
  ) {}

  public static parsedFrom = (
    givenPath: string,
  ): Effect.Effect<
    TypeScript_File_Path,
    Error,
    Path.Path
  > => Effect.gen(this, function* () {
    const ProvidedPath = yield* Path.Path;
    const proposedPath = ProvidedPath.parse(givenPath);

    if (
      proposedPath.ext !== this.extension
    ) return yield* Effect.fail(new Error(`TypeScript files must have path with a "${this.extension}" extension`));

    const validatedPath = new this(
      proposedPath.root,
      proposedPath.dir,
      proposedPath.base,
      proposedPath.ext,
      proposedPath.name,
    );

    return validatedPath;
  });

  public readonly serialized: Effect.Effect<
    string,
    never,
    Path.Path
  > = Effect.gen(this, function* () {
    const ProvidedPath = yield* Path.Path;
    return ProvidedPath.format(this);
  });
}

export {
  TypeScript_File_Path,
};
