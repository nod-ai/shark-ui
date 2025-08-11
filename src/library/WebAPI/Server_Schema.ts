import Schema from '@/library/Schema';

import Server from './Server';

/** Defines how to parse into an instance of {@link Server} */
const Server_Schema = Schema
  .object({
    origin: Schema.string(),
  })
  .transform($0 => Server.from($0));

export {
  Server_Schema,
};
