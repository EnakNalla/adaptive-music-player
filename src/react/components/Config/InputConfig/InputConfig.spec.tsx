import { fireEvent, render, screen, within } from '@test-utils/rtl';
import { timerStub } from '@test-utils/stubs/timerStub';
import userEvent from '@testing-library/user-event';
import InputConfig from './InputConfig';

describe('<InputConfig />', () => {
  it('should call setInputOption with method undefined on change click', async () => {
    const setInputOption = jest.fn();
    render(<InputConfig />, {
      configStore: {
        setInputOption,
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

    await userEvent.click(screen.getByRole('button', { name: 'Change' }));

    expect(setInputOption).toHaveBeenCalledWith('method', undefined);
  });

  it('should call setInputOption fixedPosition true on click', async () => {
    const setInputOption = jest.fn();
    render(<InputConfig />, {
      configStore: {
        setInputOption,
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

    await userEvent.click(screen.getByLabelText('Random position'));

    expect(setInputOption).toHaveBeenCalledWith('fixedPosition', true);
  });

  it('should call setInputOption size small', async () => {
    const setInputOption = jest.fn();
    render(<InputConfig />, {
      configStore: {
        setInputOption,
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

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Target size Medium' }));
    const listbox = within(screen.getByRole('listbox', { name: 'Target size' }));
    await userEvent.click(listbox.getByText('Small'));

    expect(setInputOption).toHaveBeenCalledWith('size', 'small');
  });

  it('should call setInputOption with dwellTime 2', async () => {
    const setInputOption = jest.fn();
    render(<InputConfig />, {
      configStore: {
        setInputOption,
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

    fireEvent.change(screen.getByLabelText('Dwell time'), { target: { value: 2 } });

    expect(setInputOption).toHaveBeenCalledWith('dwellTime', 2);
  });

  it('should render error for dwell time input', () => {
    const setInputOption = jest.fn();
    render(<InputConfig />, {
      configStore: {
        setInputOption,
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

    fireEvent.change(screen.getByLabelText('Dwell time'), { target: { value: -2 } });

    expect(screen.getByText('Dwell time cannot be negative')).toBeInTheDocument();
  });

  it('should call setTimer with selected timer', async () => {
    const setTimer = jest.fn();
    render(<InputConfig />, {
      playerStore: {
        setTimer,
        timer: timerStub()
      },
      configStore: {
        inputOptions: {
          size: 'medium',
          fixedPosition: false,
          dwellTime: 1
        },
        timers: [timerStub(), { name: 'Indefinite', playtime: 0, isDefault: false }]
      }
    });

    fireEvent.mouseDown(screen.getByRole('button', { name: 'Current timer timerStub' }));
    const listbox = within(screen.getByRole('listbox', { name: 'Current timer' }));

    await userEvent.click(listbox.getByText('Indefinite'));

    expect(setTimer).toHaveBeenCalledWith('Indefinite');
  });

  it('should call changeDefaultTimer', async () => {
    const changeDefaultTimer = jest.fn();
    render(<InputConfig />, {
      playerStore: {
        timer: timerStub()
      },
      configStore: {
        changeDefaultTimer,
        inputOptions: {
          size: 'medium',
          fixedPosition: false,
          dwellTime: 1
        },
        timers: [timerStub(), { name: 'Indefinite', playtime: 0, isDefault: false }]
      }
    });

    await userEvent.click(screen.getByRole('button', { name: 'False' }));

    expect(changeDefaultTimer).toHaveBeenCalledWith('Indefinite');
  });

  it('should open <Confirm /> and call removeTimer on confirm', async () => {
    const removeTimer = jest.fn();
    render(<InputConfig />, {
      playerStore: {
        timer: timerStub()
      },
      configStore: {
        removeTimer,
        inputOptions: {
          size: 'medium',
          fixedPosition: false,
          dwellTime: 1
        },
        timers: [timerStub(), { name: 'Indefinite', playtime: 0, isDefault: false }]
      }
    });

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(removeTimer).toHaveBeenCalledWith(timerStub());
  });
});
