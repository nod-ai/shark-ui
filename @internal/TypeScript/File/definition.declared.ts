import {
  FileSystem,
  type Path,
} from '@effect/platform';

import {
  Data,
  Effect,
} from 'effect';

class TypeScript_File
  extends Data.Class<{
    readonly path: TypeScript_File.Path;
  }> {
  public readonly doesExist: Effect.Effect<
    boolean,
    Error,
    | Path.Path
    | FileSystem.FileSystem
  > = Effect.gen(this, function* () {
    const ProvidedFileSystem = yield* FileSystem.FileSystem;
    return yield* ProvidedFileSystem.exists(yield* this.path.serialized);
  });
}

export {
  TypeScript_File,
};
