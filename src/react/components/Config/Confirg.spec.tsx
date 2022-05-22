import { render, screen } from '@test-utils/rtl';
import userEvent from '@testing-library/user-event';
import Config from './Config';

describe('<Config />', () => {
  it('should call setShowConfig', async () => {
    const setShowConfig = jest.fn();
    render(<Config setShowConfig={setShowConfig} />);

    await userEvent.click(screen.getByRole('button', { name: 'Return home' }));

    expect(setShowConfig).toHaveBeenCalledWith(false);
  });
});
