import { render, RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';

const customRender = (ui: ReactNode, opts?: RenderOptions) => {
  return render(<>{ui}</>, opts);
};

export * from '@testing-library/react';
export { customRender as render };
