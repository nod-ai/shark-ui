import {
  FileSystem,
  type Path,
} from '@effect/platform';

import {
  Data,
  Effect,
} from 'effect';

import {
  isEmptyArray,
  isNonEmptyArray,
} from 'effect/Array';

import type {
  Project,
  Symbol,
} from 'ts-morph';

import {
  InternalProject,
} from '../../../TSMorph';

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

  public readonly exportsUsing = (
    givenProject: Project,
  ): Effect.Effect<
    Symbol[],
    Error,
    Path.Path
  > => Effect.gen(this, function* () {
    const absolutePathToModule = yield* this.path.serialized;

    const moduleSourceFile = yield* Effect.try({
      try  : () => givenProject.addSourceFileAtPath(absolutePathToModule),
      catch: (whateverThatWasThrown) => new Error(`Failed to get source file for module at ${absolutePathToModule}.`, {
        cause: whateverThatWasThrown,
      }),
    });

    const exportsFromModule = moduleSourceFile.getExportSymbols();
    return exportsFromModule;
  });

  public readonly exports: Effect.Effect<
    Symbol[],
    Error,
    Path.Path
  > = Effect.gen(this, function* () {
    const temporaryProject = new InternalProject();
    return yield* this.exportsUsing(temporaryProject);
  });

  public readonly soleExportUsing = (
    givenProject: Project,
  ): Effect.Effect<
    Symbol,
    Error,
    Path.Path
  > => Effect.gen(this, function* () {
    const exportsFromModule = yield* this.exportsUsing(givenProject);

    if (
      !isNonEmptyArray(exportsFromModule)
    ) return yield* Effect.fail(new Error(`No exports found at ${yield* this.path.serialized}`));

    const [
      firstExportFromModule,
      ...extraneousExportsFromModule
    ] = exportsFromModule;

    if (
      isEmptyArray(extraneousExportsFromModule)
    ) return firstExportFromModule;

    const errorForExtraneousExports = new Error([
      `Found ${extraneousExportsFromModule.length.toString()} extraneous exports at ${yield* this.path.serialized}:`,
      ...extraneousExportsFromModule.map(($0) => $0.getName()),
    ].join('\n'));

    return yield* Effect.fail(errorForExtraneousExports);
  });

  public readonly soleExport: Effect.Effect<
    Symbol,
    Error,
    Path.Path
  > = Effect.gen(this, function* () {
    const temporaryProject = new InternalProject();
    return yield* this.soleExportUsing(temporaryProject);
  });
}

export {
  TypeScript_File,
};
