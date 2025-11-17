import {
  FileSystem,
  type Path,
} from '@effect/platform';

import {
  Data,
  Effect,
} from 'effect';

import {
  Node,
  type Project,
  type Symbol,
} from 'ts-morph';

import {
  InternalProject,
} from '../../../TSMorph';

import {
  soleElementIn,
} from '../../utilitiesByType/array';

import {
  hasCallableTarget,
} from '../Declaration';

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
    const soleExportFromModule = yield* soleElementIn(exportsFromModule);
    return soleExportFromModule;
  });

  public readonly soleExport: Effect.Effect<
    Symbol,
    Error,
    Path.Path
  > = Effect.gen(this, function* () {
    const temporaryProject = new InternalProject();
    return yield* this.soleExportUsing(temporaryProject);
  });

  public readonly soleExportIsCallableUsing = (
    givenProject: Project,
  ): Effect.Effect<
    boolean,
    Error,
    Path.Path
  > => Effect.gen(this, function* () {
    const soleExportSymbol = yield* this.soleExportUsing(givenProject);
    const soleExportDeclaration = yield* soleElementIn(soleExportSymbol.getDeclarations());

    if (
      Node.isExportSpecifier(soleExportDeclaration)
    ) return yield* hasCallableTarget(soleExportDeclaration);

    const serializedPath = yield* this.path.serialized;
    const exportSpecificationError = new Error(`Sole export declaration in ${serializedPath} was not an export specifier.`);
    return yield* Effect.fail(exportSpecificationError);
  });
}

export {
  TypeScript_File,
};
