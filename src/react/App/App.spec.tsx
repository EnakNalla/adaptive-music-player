import { render } from '@test-utils/rtl';
import App from './App';

describe('<App />', () => {
  it('should render correctly with production store', () => {
    render(<App />);
  });

  it('should render App', () => {
    render(<App />, {
      initData: jest.fn(),
      configStore: {
        inputOptions: {
          method: 'mouse'
        }
      },
      playerStore: {
        enabled: false,
        songs: [],
        inputOptions: {
          method: 'mouse'
        }
      }
    });
  });

  it('should return <InputPrompt /> when there is no method', () => {
    render(<App />, {
      initData: jest.fn(),
      configStore: {
        inputOptions: {}
      }
    });
  });
});
