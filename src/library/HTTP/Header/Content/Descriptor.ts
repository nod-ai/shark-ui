import type ContentDescriptor from '@/library/ContentDescriptor'; // eslint-disable-line @typescript-eslint/no-unused-vars -- used in JSDoc

/**
 * The name of the header that describes the nature of some content.
 * See {@link ContentDescriptor}
 */
const HTTP_Header_Content_Descriptor = 'content-type';
type HTTP_Header_Content_Descriptor = typeof HTTP_Header_Content_Descriptor;

export {
  HTTP_Header_Content_Descriptor,
};
