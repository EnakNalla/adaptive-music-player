import { render, screen, waitFor } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import EyeGaze from './EyeGaze';

jest.useFakeTimers();
jest.spyOn(global, 'clearTimeout');
jest.spyOn(global, 'setTimeout');

describe('<EyeGaze />', () => {
  it('should call player.play when hovering over circle for specified dwellTime', async () => {
    const player = { play: jest.fn() };
    render(<EyeGaze />, {
      playerStore: {
        player,
        inputOptions: {
          fixedPosition: true
        },
        inputSize: { size: 100, imgSize: 70 }
      }
    });

    userEvent.hover(screen.getByLabelText('eye gaze input'));

    await waitFor(() => expect(player.play).toHaveBeenCalled());
  });

  it('should clearTimeout & not call player.play when hover is cleared before dwellTime', async () => {
    const player = { play: jest.fn() };
    render(<EyeGaze />, {
      playerStore: {
        player,
        inputOptions: {
          fixedPosition: true
        },
        inputSize: { size: 100, imgSize: 70 }
      }
    });

    userEvent.hover(screen.getByLabelText('eye gaze input'));
    userEvent.unhover(screen.getByLabelText('eye gaze input'));

    expect(setTimeout).toHaveBeenCalled();
    expect(clearTimeout).toHaveBeenCalled();
    expect(player.play).not.toHaveBeenCalled();
  });
});
