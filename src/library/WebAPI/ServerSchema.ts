import {
  z,
} from 'zod/v4';

import Server from './Server';

/** Defines how to parse into an instance of {@link Server} */
export const ServerSchema = z.object({
  origin: z.string(),
}).transform($0 => Server.from($0));
