import {
  get,
  ref,
  set,
  type Ref,
} from '@/library/vue/reactivity.ts';

interface StatefulProcess<
  SomeProduct,
> {
  initiate: () => Promise<void>;
  isInProgress: boolean;
  product: SomeProduct | null;
}

/** Useful when state of UI is dependent on some async operation and the product it produces */
export const useStatefulProcess = <
  SomeProduct,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
): StatefulProcess<SomeProduct> => {
  const flagIsRaised = ref(false);

  const capturedProduct: Ref<SomeProduct | null> = ref(null);

  const forciblyCaptureProduct = async (): Promise<void> => {
    using cleanup = new DisposableStack();

    set(capturedProduct, null);
    set(flagIsRaised, true);

    cleanup.defer(() => {
      set(flagIsRaised, false);
    });

    const retrievedProduct = await forciblyRetrieveProduct();
    set(capturedProduct, retrievedProduct);
  };

  return {
    initiate: forciblyCaptureProduct,
    get isInProgress() {
      return get(flagIsRaised);
    },
    get product() {
      if (
        this.isInProgress
      ) return null;

      return get(capturedProduct);
    },
  };
};
