import {
  FileSystem,
  type Path,
} from '@effect/platform';

import {
  Data,
  Effect,
} from 'effect';

import {
  escape,
} from 'effect/RegExp';

import type {
  Project,
  SourceFile,
} from 'ts-morph';

import TypeScript from '../@internal/TypeScript';

import {
  InternalProject,
} from '../TSMorph';

class TestCompanion
  extends Data.Class<{
    readonly unit: TypeScript.File;
  }> {
  private static readonly preExtensionSuffix = '.test';

  private readonly path: Effect.Effect<
    TypeScript.File.Path,
    never,
    Path.Path
  > = Effect.gen(this, function* () {
    const serializedPathToUnit = yield* this.unit.path.serialized;

    const escapedExtension = escape(this.unit.path.ext);
    const capturedExtension = new RegExp(`(${escapedExtension})$`);

    const serializedPathToTestCompanion = serializedPathToUnit.replace(
      capturedExtension,
      TestCompanion.preExtensionSuffix.concat('$1'),
    );

    const pathToTestCompanion = yield* TypeScript.File.Path.parsedFrom(serializedPathToTestCompanion).pipe(
      Effect.orDie,
    );

    return pathToTestCompanion;
  });

  public readonly addTo = (
    givenProject: Project,
  ): Effect.Effect<
    SourceFile,
    Error,
    Path.Path
  > => Effect.gen(this, function* () {
    const /*     */ pathToTestCompanion = yield* this.path;
    const serializedPathToTestCompanion = yield* pathToTestCompanion.serialized;

    const testCompanionSource = yield* Effect.try({
      try  : () => givenProject.createSourceFile(serializedPathToTestCompanion),
      catch: (whateverThatWasThrown) => new Error('Test companion already exists.', {
        cause: whateverThatWasThrown,
      }),
    });

    const keyForTestSuiteImport = 'describe';

    testCompanionSource.addImportDeclaration({
      moduleSpecifier: 'vitest',
      namedImports   : [
        keyForTestSuiteImport,
      ],
    });

    const soleExportFromUnit = yield* this.unit.soleExport;
    const soleExportFromUnit_name = soleExportFromUnit.getName();

    testCompanionSource.addImportDeclaration({
      moduleSpecifier: `./${this.unit.path.name}`,
      namedImports   : [
        soleExportFromUnit_name,
      ],
    });

    testCompanionSource.addStatements(`${keyForTestSuiteImport}.todo(${soleExportFromUnit_name});`);

    return testCompanionSource;
  });

  public readonly write = (): Effect.Effect<
    SourceFile,
    Error,
    Path.Path
  > => Effect.gen(this, function* () {
    const currentProject = new InternalProject();
    const testCompanionSource = yield* this.addTo(currentProject);

    yield* Effect.try(() => currentProject.saveSync());

    return testCompanionSource;
  });

  public readonly doesExist: Effect.Effect<
    boolean,
    Error,
    | Path.Path
    | FileSystem.FileSystem
  > = Effect.gen(this, function* () {
    const /*     */ pathToTestCompanion = yield* this.path;
    const serializedPathToTestCompanion = yield* pathToTestCompanion.serialized;
    const ProvidedFileSystem = yield* FileSystem.FileSystem;
    return yield* ProvidedFileSystem.exists(serializedPathToTestCompanion);
  });

  public static doesExistFor = (
    givenUnit: TypeScript.File,
  ): Effect.Effect<
    boolean,
    Error,
    | Path.Path
    | FileSystem.FileSystem
  > => Effect.gen(this, function* () {
    if (
      !(yield* givenUnit.doesExist)
    ) return yield* Effect.fail(new Error(`Unit does not exist at ${yield* givenUnit.path.serialized}`));

    const expectedTestCompanion = new TestCompanion({
      unit: givenUnit,
    });

    return yield* expectedTestCompanion.doesExist;
  });
}

export {
  TestCompanion,
};
