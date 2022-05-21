import { render, screen } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import ClickInput from './ClickInput';

describe('<ClickInput />', () => {
  it('should render circle and call player.play on click', async () => {
    const player = { play: jest.fn() };
    render(<ClickInput />, {
      playerStore: {
        player,
        inputOptions: {
          fixedPosition: true
        },
        inputSize: { size: 100, imgSize: 70 }
      }
    });

    await userEvent.click(screen.getByLabelText('mouse input'));

    expect(player.play).toHaveBeenCalled();
  });

  it('should choose random position for circle and call player.play on click when !inputOptions.fixedPosition & touch', async () => {
    const player = { play: jest.fn() };
    const getRandomPosition = jest.fn().mockReturnValue({ top: '5px', left: '5px' });
    render(<ClickInput touch />, {
      playerStore: {
        player,
        inputOptions: {
          fixedPosition: false
        },
        inputSize: { size: 100, imgSize: 70 },
        getRandomPosition
      }
    });

    expect(getRandomPosition).toHaveBeenCalled();

    await userEvent.click(screen.getByLabelText('touch input'));

    expect(player.play).toHaveBeenCalled();
  });
});
