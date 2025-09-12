import {
  ContentDescriptor,
} from '../definition.declared.ts';

/**
 * A misnomer for {@link ContentDescriptor}.
 *
 * The intended connotation for "type" is "a string of characters that describes the nature of some content", which is more accurately described as a "descriptor"
 */
const ContentType = ContentDescriptor;
type ContentType = ContentDescriptor;

export {
  ContentType,
};
