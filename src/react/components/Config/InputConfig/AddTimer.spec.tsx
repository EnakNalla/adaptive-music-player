import { fireEvent, render, screen, waitFor } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import AddTimer from './AddTimer';

describe('<AddTimer />', () => {
  it('should call addTimer when submit is clicked', async () => {
    const addTimer = jest.fn();
    render(<AddTimer />, { configStore: { addTimer } });

    await userEvent.click(screen.getByRole('button', { name: 'Create timer' }));
    fireEvent.change(screen.getByLabelText('Name', { exact: false }), {
      target: { value: 'test' }
    });
    fireEvent.change(screen.getByLabelText('Time (in seconds)', { exact: false }), {
      target: { value: 2 }
    });
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(addTimer).toHaveBeenCalledWith({ name: 'test', playtime: 2000, isDefault: false });
    });
  });

  it('should render error for Name input', async () => {
    const addTimer = jest.fn();
    render(<AddTimer />, { configStore: { addTimer } });

    await userEvent.click(screen.getByRole('button', { name: 'Create timer' }));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Name is required.')).toBeInTheDocument();
  });

  it('should render error for Name input', async () => {
    const addTimer = jest.fn();
    render(<AddTimer />, { configStore: { addTimer } });

    await userEvent.click(screen.getByRole('button', { name: 'Create timer' }));
    fireEvent.change(screen.getByLabelText('Name', { exact: false }), {
      target: { value: 'test' }
    });
    fireEvent.change(screen.getByLabelText('Time (in seconds)', { exact: false }), {
      target: { value: -2 }
    });
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('Playtime must be greater than zero.')).toBeInTheDocument();
  });

  it('should render error from addTimer', async () => {
    const addTimer = jest.fn().mockImplementation(() => {
      throw new Error('test error');
    });
    render(<AddTimer />, { configStore: { addTimer } });

    await userEvent.click(screen.getByRole('button', { name: 'Create timer' }));
    fireEvent.change(screen.getByLabelText('Name', { exact: false }), {
      target: { value: 'test' }
    });
    fireEvent.change(screen.getByLabelText('Time (in seconds)', { exact: false }), {
      target: { value: 2 }
    });
    await userEvent.click(screen.getByLabelText('Default'));
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(screen.getByText('test error')).toBeInTheDocument();
  });
});
