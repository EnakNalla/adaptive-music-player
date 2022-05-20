import StoreProvider, { TestStore } from '@stores';
import { render, RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';

const customRender = (ui: ReactNode, store?: TestStore, opts?: RenderOptions) => {
  return render(<StoreProvider store={store}>{ui}</StoreProvider>, opts);
};

export * from '@testing-library/react';
export { customRender as render };
