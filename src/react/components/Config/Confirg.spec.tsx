import { render, screen } from '@test-utils/rtl';
import { timerStub } from '@test-utils/stubs/timerStub';
import userEvent from '@testing-library/user-event';
import Config from './Config';

describe('<Config />', () => {
  it('should call setShowConfig', async () => {
    const setShowConfig = jest.fn();
    render(<Config setShowConfig={setShowConfig} />, {
      configStore: {
        inputOptions: {
          size: 'medium',
          fixedPosition: false,
          dwellTime: 1
        },
        timers: [timerStub()]
      },
      playerStore: {
        timer: timerStub()
      }
    });

    await userEvent.click(screen.getByRole('button', { name: 'Return home' }));

    expect(setShowConfig).toHaveBeenCalledWith(false);
  });
});
