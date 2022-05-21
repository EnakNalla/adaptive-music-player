import { render } from '@test-utils/rtl';
import Visualiser from './Visualiser';

const fromElement = jest.fn();
jest.mock('@foobar404/wave', () => {
  return {
    default: class {
      fromElement = fromElement;
    }
  };
});

describe('<Visualiser />', () => {
  it('should render canvas without error', () => {
    render(<Visualiser />, {
      playerStore: {
        visualiserActive: true
      },
      configStore: {
        visualiserOptions: {
          type: 'cubes',
          stroke: 2,
          colours: {
            primary: '#d92027',
            secondary: '#ff9234',
            tertiary: '#ffcd3c',
            quaternary: '#35d0ba',
            background: '#000000'
          }
        }
      }
    });

    expect(fromElement).toHaveBeenCalled();
  });
});
