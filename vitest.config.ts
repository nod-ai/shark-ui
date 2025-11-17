import {
  fileURLToPath,
} from 'node:url';

import {
  mergeConfig,
  defineConfig,
  configDefaults,
  coverageConfigDefaults,
} from 'vitest/config';

import viteConfig from './vite.config';

import {
  BehavioralOnlyReporter,
} from './vitest/BehavioralOnlyReporter';

const vitestConfig = mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude    : [
        ...configDefaults.exclude,
        'e2e/**',
      ],
      root    : fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        enabled: true,
        include: [
          'src/library/**/*.ts',
          'src/features/**/*.ts',
        ],
        exclude: [
          ...coverageConfigDefaults.exclude,
          'src/**/index.ts', // barrel files as entry points
          'src/**/exports.*.ts', // barrel files as export control
          'src/**/definition.assembled*.ts', // barrel files as object assemblers
          'src/**/definition.declared.augmentation.ts', // side-effect files for module augmentation
          'src/**/definition.declared.withAugmentation.ts', // barrel files as object augmenters
          'src/**/external.ts', // facades for external libraries
        ],
        reporter: [
          'json-summary', // "json" to make it machine readable, "summary" for a schema that's easier to parse
        ],
      },
      reporters: [
        new BehavioralOnlyReporter(),
      ],
    },
  }),
);

export {
  vitestConfig as default,
};
