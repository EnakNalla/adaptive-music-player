import { render } from '@test-utils/rtl';
import Switch from './Switch';

describe('<Switch />', () => {
  it('should render fixed', () => {
    render(<Switch />, {
      playerStore: {
        inputOptions: {
          fixedPosition: true
        },
        inputSize: { size: 100, imgSize: 70 }
      }
    });
  });
});
