import { render, screen } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import Confirm from './Confirm';

describe('<Confirm />', () => {
  it('should call onConfirm when Confirm is clicked', async () => {
    const onConfirm = jest.fn();
    render(<Confirm onConfirm={onConfirm} content="test" />, {});

    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));
    await userEvent.click(screen.getByRole('button', { name: 'Confirm' }));

    expect(onConfirm).toHaveBeenCalled();
  });
});
