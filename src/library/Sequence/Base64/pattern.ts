import Base64 from '@/library/Base64';

const Sequence_Base64_pattern = new RegExp(`^[${Base64.Alphabet.pattern.source}]+$`);

export {
  Sequence_Base64_pattern,
};
