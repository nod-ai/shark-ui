/** Examples from each classification of number */
const numberTaxonomy = {
  signed: {
    negative: /**/ -1,
    positive: /* */ 1,
  },
  fractional: {
    rational      : 1 / 2,
    irrational    : Math.PI,
    transcendental: Math.E,
  },
  infinite: {
    positive: Infinity,
    negative: -Infinity,
  },
  runtime: {
    min: Number.MIN_VALUE,
    max: Number.MAX_VALUE,
  },
  origin   : 0,
  undefined: NaN,
} as const;

export {
  numberTaxonomy,
};
