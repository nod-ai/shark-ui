import {
  ContentDescriptor,
} from '../definition.ts';

/**
 * A misnomer for {@link ContentDescriptor}.
 *
 * "MIME" means "Multipurpose Internet Mail Extension", but that's no longer the only use-case for this standard.
 */
const MIMEType = ContentDescriptor;
type MIMEType = ContentDescriptor;

export {
  MIMEType,
};
