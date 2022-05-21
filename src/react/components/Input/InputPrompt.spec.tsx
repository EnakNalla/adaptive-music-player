import { render, screen } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import InputPrompt from './InputPrompt';

describe('<InputPrompt />', () => {
  it('should call setInputOption with method = "mouse"', async () => {
    const setInputOption = jest.fn();
    render(<InputPrompt />, { configStore: { setInputOption } });

    await userEvent.click(screen.getByRole('button', { name: 'mouse input method select' }));

    expect(setInputOption).toHaveBeenCalledWith('method', 'mouse');
  });

  it('should call setInputOption with method = "touch"', async () => {
    const setInputOption = jest.fn();
    render(<InputPrompt />, { configStore: { setInputOption } });

    await userEvent.click(screen.getByRole('button', { name: 'touch input method select' }));

    expect(setInputOption).toHaveBeenCalledWith('method', 'touch');
  });

  it('should call setInputOption with method = "eye gaze"', async () => {
    const setInputOption = jest.fn();
    render(<InputPrompt />, { configStore: { setInputOption } });

    await userEvent.click(screen.getByRole('button', { name: 'eye gaze input method select' }));

    expect(setInputOption).toHaveBeenCalledWith('method', 'eye gaze');
  });

  it('should call setInputOption with method = "switch"', async () => {
    const setInputOption = jest.fn();
    render(<InputPrompt />, { configStore: { setInputOption } });

    await userEvent.click(screen.getByRole('button', { name: 'switch input method select' }));

    expect(setInputOption).toHaveBeenCalledWith('method', 'switch');
  });
});
