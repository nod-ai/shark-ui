import {
  ContentDescriptor,
} from '../definition.ts';

/**
 * A misnomer for {@link ContentDescriptor}.
 *
 * The intended connotation for "media" is "data formatted for client-side consumption", which is more accurately described as "content".
 *
 * This it at odds with the common definition of "media" that's most prevalent to this context which is "digital content available for human consumption (i.e. playback, viewing, reading, etc.)".
 */
const MediaType = ContentDescriptor;
type MediaType = ContentDescriptor;

export {
  MediaType,
};
