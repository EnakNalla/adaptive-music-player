import { fireEvent, render, screen } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import SaveConfig from './SaveConfig';

describe('<SaveConfig />', () => {
  it('should call saveConfig with values', async () => {
    const saveConfig = jest.fn();
    render(<SaveConfig />, { configStore: { saveConfig } });

    await userEvent.click(screen.getByRole('button', { name: 'Save current' }));
    fireEvent.change(screen.getByLabelText('Name', { exact: false }), {
      target: { value: 'test' }
    });
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(saveConfig).toHaveBeenCalledWith('test', false);
  });

  it('should render error when name is invalid', async () => {
    const saveConfig = jest.fn();
    render(<SaveConfig />, { configStore: { saveConfig } });

    await userEvent.click(screen.getByRole('button', { name: 'Save current' }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
  });

  it('should render error from saveConfig', async () => {
    const saveConfig = jest.fn().mockImplementation(() => {
      throw new Error('test error');
    });
    render(<SaveConfig />, { configStore: { saveConfig } });

    await userEvent.click(screen.getByRole('button', { name: 'Save current' }));
    fireEvent.change(screen.getByLabelText('Name', { exact: false }), {
      target: { value: 'test' }
    });
    await userEvent.click(screen.getByLabelText('Load on startup'));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('test error')).toBeInTheDocument();
  });
});
