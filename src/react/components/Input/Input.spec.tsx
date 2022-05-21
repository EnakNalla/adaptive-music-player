import { fireEvent, render } from '@test-utils/rtl';
import Input from './Input';

describe('<Input />', () => {
  it('should call playerStore.onKeyup', () => {
    const onKeyup = jest.fn();
    render(<Input />, {
      playerStore: {
        onKeyup,
        inputOptions: {
          fixedPosition: true,
          method: 'switch'
        },
        inputSize: { size: 100, imgSize: 70 },
        enabled: true
      }
    });

    fireEvent.keyUp(document);

    expect(onKeyup).toHaveBeenCalled();
  });

  it('should render <EyeGaze />', () => {
    render(<Input />, {
      playerStore: {
        onKeyup: jest.fn(),
        inputOptions: {
          fixedPosition: true,
          method: 'eye gaze'
        },
        inputSize: { size: 100, imgSize: 70 },
        enabled: true
      }
    });
  });

  it('should render <ClickInput />', () => {
    render(<Input />, {
      playerStore: {
        onKeyup: jest.fn(),
        inputOptions: {
          fixedPosition: true,
          method: 'mouse'
        },
        inputSize: { size: 100, imgSize: 70 },
        enabled: true
      }
    });
  });

  it('should render <ClickInput touch />', () => {
    render(<Input />, {
      playerStore: {
        onKeyup: jest.fn(),
        inputOptions: {
          fixedPosition: true,
          method: 'touch'
        },
        inputSize: { size: 100, imgSize: 70 },
        enabled: true
      }
    });
  });

  it('should not render when playerStore.visualiserActive', () => {
    render(<Input />, {
      playerStore: {
        visualiserActive: true,
        onKeyup: jest.fn()
      }
    });
  });
});
